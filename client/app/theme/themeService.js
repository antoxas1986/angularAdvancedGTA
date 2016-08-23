(function () {
    'use strict';

    angular
        .module('app.theme')
        .factory('themeService', themeService);

    themeService.$inject = ['themeFactory', '$q', '$cacheFactory'];

    function themeService(themeFactory, $q, $cacheFactory) {

        return {
            getThemeById: getThemeById,
            createTheme: createTheme,
            updateTheme: updateTheme,
            deleteTheme: deleteTheme,
            getTheme: getTheme,
            getGamesByTheme: getGamesByTheme

        };

        /////////////////////////////////////////////////////

        function getGamesByTheme(themeId) {
            var deferred = $q.defer();
            deleteThemeListCache();
            themeFactory.getGamesByThemeId({ id: themeId }, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getTheme() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('themeCache');
            if (!dataCache) {
                dataCache = $cacheFactory('themeCache');
            }

            var summaryFromCache = dataCache.get('themeList');
            if (summaryFromCache) {
                deferred.resolve(summaryFromCache);
            } else {
                var alltheme = themeFactory.query().$promise.then(function (themeList) {
                    dataCache.put('themeList', themeList);
                    return themeList;

                });
                deferred.resolve(alltheme);
            }
            return deferred.promise;
        }

        function deleteThemeListCache() {
            var dataCache = $cacheFactory.get('themeCache');
            if (dataCache) {
                dataCache.remove('themeList');
            }
        }

        function deleteTheme(theme) {
            var deferred = $q.defer();
            deleteThemeListCache();
            themeFactory.delete(theme, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function updateTheme(theme) {
            deleteThemeListCache();
            var deferred = $q.defer();
            themeFactory.update(theme, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function createTheme(theme) {
            deleteThemeListCache();
            var deferred = $q.defer();
            themeFactory.save(theme, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getThemeById(id) {
            var deferred = $q.defer();
            var theme = themeFactory.get({ id: id }).$promise.then(function (data) {
                return data;
            });
            deferred.resolve(theme);
            return deferred.promise;
        }
    }
})();