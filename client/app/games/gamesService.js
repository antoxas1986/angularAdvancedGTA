(function () {
    'use strict';

    angular
        .module('app.games')
        .factory('gamesService', gamesService);

    gamesService.$inject = ['gamesFactory', '$q', '$cacheFactory', 'toaster'];

    function gamesService(gamesFactory, $q, $cacheFactory, toaster) {

        return {
            getGameById: getGameById,
            createGame: createGame,
            updateGame: updateGame,
            deleteGame: deleteGame,
            getGames: getGames,

        };

        /////////////////////////////////////////////////////


        function getGames() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('gamesCache');
            if (!dataCache) {
                dataCache = $cacheFactory('gamesCache');
            }

            var summaryFromCache = dataCache.get('gameList');
            if (summaryFromCache) {
                toaster.pop('success', 'returning summary from cache');
                deferred.resolve(summaryFromCache);
            } else {
                toaster.pop('success', 'getting new data');
                var allGames = gamesFactory.query().$promise.then(function (gameList) {
                    dataCache.put('gameList', gameList);
                    return gameList;

                });
                deferred.resolve(allGames);
            }
            return deferred.promise;
        }

        function deleteGameListCache() {
            var dataCache = $cacheFactory.get('gamesCache');
            if (dataCache) {
                dataCache.remove('gameList');
            }
        }

        function deleteGame(game) {
            var deferred = $q.defer();
            deleteGameListCache();
            gamesFactory.delete(game, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function updateGame(game) {
            deleteGameListCache();
            var deferred = $q.defer();
            gamesFactory.update(game, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function createGame(game) {
            deleteGameListCache();
            var deferred = $q.defer();
            gamesFactory.save(game, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getGameById(id) {
            var deferred = $q.defer();
            var game = gamesFactory.get({ id: id }).$promise.then(function (data) {
                data.releaseDate = new Date(data.releaseDate);
                return data;
            });
            deferred.resolve(game);
            return deferred.promise;
        }
    }
})();