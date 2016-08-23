(function () {
    'use strict';

    angular
        .module('app.genre')
        .factory('genreService', genreService);

    genreService.$inject = ['genreFactory', '$q', '$cacheFactory'];

    function genreService(genreFactory, $q, $cacheFactory) {

        return {
            getGenreById: getGenreById,
            createGenre: createGenre,
            updateGenre: updateGenre,
            deleteGenre: deleteGenre,
            getGenre: getGenre,
            getGamesByGenre: getGamesByGenre

        };

        /////////////////////////////////////////////////////

        function getGamesByGenre(genreId) {
            var deferred = $q.defer();
            deleteGenreListCache();
            genreFactory.getGamesByGenreId({ id: genreId }, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getGenre() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('genreCache');
            if (!dataCache) {
                dataCache = $cacheFactory('genreCache');
            }

            var summaryFromCache = dataCache.get('genreList');
            if (summaryFromCache) {
                deferred.resolve(summaryFromCache);
            } else {
                var allgenre = genreFactory.query().$promise.then(function (genreList) {
                    dataCache.put('genreList', genreList);
                    return genreList;

                });
                deferred.resolve(allgenre);
            }
            return deferred.promise;
        }

        function deleteGenreListCache() {
            var dataCache = $cacheFactory.get('genreCache');
            if (dataCache) {
                dataCache.remove('genreList');
            }
        }

        function deleteGenre(genre) {
            var deferred = $q.defer();
            deleteGenreListCache();
            genreFactory.delete(genre, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function updateGenre(genre) {
            deleteGenreListCache();
            var deferred = $q.defer();
            genreFactory.update(genre, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function createGenre(genre) {
            deleteGenreListCache();
            var deferred = $q.defer();
            genreFactory.save(genre, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getGenreById(id) {
            var deferred = $q.defer();
            var genre = genreFactory.get({ id: id }).$promise.then(function (data) {
                return data;
            });
            deferred.resolve(genre);
            return deferred.promise;
        }
    }
})();