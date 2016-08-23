(function () {
    'use strict';

    angular
        .module('app.genre')
        .factory('genreFactory', genreFactory);

    genreFactory.$inject = ['$resource'];

    function genreFactory($resource) {

        return $resource('/api/genres/:id', { id: '@_id' }, {
            update: { method: 'PUT' },
            getGamesByGenreId: {
                url: '/api/genres/:id/games',
                method: 'GET'
            }
        });
    }
})();