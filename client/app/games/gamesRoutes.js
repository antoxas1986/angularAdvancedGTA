(function () {
    'use strict';

    angular
        .module('app.games')
        .config(gamesRoute);

    gamesRoute.$inject = ['$stateProvider'];

    function gamesRoute($stateProvider) {

        $stateProvider.state('games', {
            absract: true,
            url: '/games',
            template: '<ui-view />',
        });

        $stateProvider.state('games.list', {
            url: '/list',
            templateUrl: 'client/app/games/index.tmp.html',
            controller: 'GamesCtrl',
            controllerAs: 'vm',
        });

        $stateProvider.state('games.details', {
            url: '/details/:id',
            templateUrl: 'client/app/games/details.delete.tmp.html',
            controller: 'GamesCtrl',
            controllerAs: 'vm',
            params: {

                //Sample how to pass object from one state to another. 
                //Game come from games list and pass to details. In games list html make ui-sref='games.details({game:game})' 
                //Object 'game' in params must exist, later it will resolve. 
                //Change in controller vm.game = $stateParams.game;

                //    game: null,
                action: 'details',
                header: 'Details for'
            }
            // resolve: {
            //     game: ['$stateParams', function ($stateParams) {
            //         return $stateParams.game;
            //     }]
            // }
        });

        $stateProvider.state('games.delete', {
            url: '/delete/:id',
            templateUrl: 'client/app/games/details.delete.tmp.html',
            controller: 'GamesCtrl',
            controllerAs: 'vm',
            params: {
                action: 'delete',
                header: 'Are you sure you want to delete this game?'
            }
        });

        $stateProvider.state('games.create', {
            url: '/create',
            templateUrl: 'client/app/games/create.edit.tmp.html',
            controller: 'GamesCtrl',
            controllerAs: 'vm',
            params: {
                action: 'create',
                header: 'Create new game'
            }
        });

        $stateProvider.state('games.edit', {
            url: '/edit/:id',
            templateUrl: 'client/app/games/create.edit.tmp.html',
            controller: 'GamesCtrl',
            controllerAs: 'vm',
            params: {
                action: 'edit',
                header: 'Edit game'
            }
        });

        $stateProvider.state('games.apiList', {
            url: '/apiList',
            templateUrl: 'client/app/IGDB/apiIndex.tmp.html',
            controller: 'IgdbCtrl',
            controllerAs: 'vm',
            params: {
                action: 'apiList',
                header: 'Games from IGDB'
            }
        });
    }
} ());