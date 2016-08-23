(function () {
    'use strict';

    angular
        .module('app.publisher')
        .factory('publisherFactory', publisherFactory);

    publisherFactory.$inject = ['$resource'];

    function publisherFactory($resource) {

        return $resource('/api/publishers/:id', { id: '@_id' }, {
            update: { method: 'PUT' },
            getGamesByPublisherId: {
                url: '/api/publishers/:id/games',
                method: 'GET'
            }
        });
    }
})();