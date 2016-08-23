(function () {
    'use strict';

    angular
        .module('app.games')
        .factory('igdbFactory', igdbFactory);

    igdbFactory.$inject = ['$resource', '$http'];

    function igdbFactory($resource, $http) {
        var service = {
            getStuff: getStuff
        };

        return service;

        ////////////////

        function getStuff(options, param, id) {
            var url = (id === '' || angular.isUndefined(id)) ?
                'https://igdbcom-internet-game-database-v1.p.mashape.com/' + param :
                'https://igdbcom-internet-game-database-v1.p.mashape.com/' + param + id;

            return $http({
                url: url,
                method: 'GET',
                params: options,
                headers: {
                    'X-Mashape-Authorization': 's2lhRTsNbnmshcKHCc1d5v41F9FNp1l5YgSjsnJVXsjQMQuM9Z'
                },
                success: function (data) { return data; },
                error: function (err) { alert(err); }
            });
        }
    }
})();