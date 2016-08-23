(function () {
    'use strict';

    angular
        .module('app.games')
        .config(gamesRoute);

    gamesRoute.$inject = ['$stateProvider'];

    function gamesRoute($stateProvider) {

        $stateProvider.state('platformgames', {
            url: '/platform/:id/games',
            templateUrl: 'client/app/helpers/games.tmp.html',
            controller: 'HelperCtrl',
            controllerAs: 'vm',
            params: {
                action: 'details',
                header: 'Here is list of games by platform',
                type: 'platform'
            }
        });

        $stateProvider.state('themegames', {
            url: '/theme/:id/games',
            templateUrl: 'client/app/helpers/games.tmp.html',
            controller: 'HelperCtrl',
            controllerAs: 'vm',
            params: {
                action: 'details',
                header: 'Here is list of games by theme',
                type: 'theme'
            }
        });

        $stateProvider.state('genregames', {
            url: '/genre/:id/games',
            templateUrl: 'client/app/helpers/games.tmp.html',
            controller: 'HelperCtrl',
            controllerAs: 'vm',
            params: {
                action: 'details',
                header: 'Here is list of games by genre',
                type: 'genre'
            }
        });

        $stateProvider.state('publishergames', {
            url: '/publisher/:id/games',
            templateUrl: 'client/app/helpers/games.tmp.html',
            controller: 'HelperCtrl',
            controllerAs: 'vm',
            params: {
                action: 'details',
                header: 'Here is list of games by publisher',
                type: 'publisher'
            }
        });
    }

} ());