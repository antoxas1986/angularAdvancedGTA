(function () {
    'use strict';

    angular
        .module('app.platform')
        .factory('platformService', platformService);

    platformService.$inject = ['platformFactory', '$q', '$cacheFactory'];

    function platformService(platformFactory, $q, $cacheFactory) {

        return {
            getPlatformById: getPlatformById,
            createPlatform: createPlatform,
            updatePlatfrom: updatePlatfrom,
            deletePlatform: deletePlatform,
            getPlatform: getPlatform,
            getGamesByPlatform: getGamesByPlatform

        };

        /////////////////////////////////////////////////////

        function getGamesByPlatform(platformId) {
            var deferred = $q.defer();
            deletePlatformListCache();
            platformFactory.getGamesByPlatformId({ id: platformId }, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getPlatform() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('paltfromCache');
            if (!dataCache) {
                dataCache = $cacheFactory('paltfromCache');
            }

            var summaryFromCache = dataCache.get('platformList');
            if (summaryFromCache) {
                deferred.resolve(summaryFromCache);
            } else {
                var allPlatform = platformFactory.query().$promise.then(function (platformList) {
                    dataCache.put('platformList', platformList);
                    return platformList;

                });
                deferred.resolve(allPlatform);
            }
            return deferred.promise;
        }

        function deletePlatformListCache() {
            var dataCache = $cacheFactory.get('paltfromCache');
            if (dataCache) {
                dataCache.remove('platformList');
            }

        }

        function deletePlatform(platform) {
            var deferred = $q.defer();
            deletePlatformListCache();
            platformFactory.delete(platform, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function updatePlatfrom(platform) {
            deletePlatformListCache();
            var deferred = $q.defer();
            platformFactory.update(platform, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function createPlatform(platform) {
            deletePlatformListCache();
            var deferred = $q.defer();
            platformFactory.save(platform, function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.resolve(error);
            });
            return deferred.promise;
        }

        function getPlatformById(id) {
            var deferred = $q.defer();
            var platform = platformFactory.get({ id: id }).$promise.then(function (data) {
                return data;
            });
            deferred.resolve(platform);
            return deferred.promise;
        }
    }
})();