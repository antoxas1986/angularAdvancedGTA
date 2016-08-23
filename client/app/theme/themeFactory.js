(function () {
    'use strict';

    angular
        .module('app.theme')
        .factory('themeFactory', themeFactory);

    themeFactory.$inject = ['$resource'];

    function themeFactory($resource) {
        return $resource('/api/themes/:id', { id: '@_id' }, {
            update: { method: 'PUT' },
            getGamesByThemeId: {
                url: '/api/themes/:id/games',
                params: { id: '@_id' },
                method: 'GET'
            }
        });
    }
})();