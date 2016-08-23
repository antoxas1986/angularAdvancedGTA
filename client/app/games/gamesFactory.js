(function () {
    'use strict';

    angular
        .module('app.games')
        .factory('gamesFactory', gamesFactory);

    gamesFactory.$inject = ['$resource'];

    function gamesFactory($resource) {

        return $resource('/api/games/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });
    }
})();