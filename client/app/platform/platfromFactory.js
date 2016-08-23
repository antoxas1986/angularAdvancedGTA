(function () {
    'use strict';

    angular
        .module('app.platform')
        .factory('platformFactory', platformFactory);

    platformFactory.$inject = ['$resource'];

    function platformFactory($resource) {

        return $resource('/api/platforms/:id', { id: '@_id' }, {
            update: { method: 'PUT' },
            getGamesByPlatformId: {
                url: '/api/platforms/:id/games',
                method: 'GET' 
            }
        });
    }
})();