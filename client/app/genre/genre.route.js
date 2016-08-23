(function () {
    'use strict';

    angular
        .module('app.genre')
        .config(genreRoute);

    genreRoute.$inject = ['$stateProvider'];

    function genreRoute($stateProvider) {

        $stateProvider.state('genre', {
            absract: true,
            url: '/genre',
            template: '<ui-view />',
        });

        $stateProvider.state('genre.list', {
            url: '/list',
            templateUrl: 'client/app/genre/index.tmp.html',
            controller: 'GenreCtrl',
            controllerAs: 'vm',
        });

        $stateProvider.state('genre.details', {
            url: '/details/:id',
            templateUrl: 'client/app/genre/details.delete.tmp.html',
            controller: 'genreCtrl',
            controllerAs: 'vm',
            params: {
                action: 'details',
                header: 'Details for your genre'
            }
        });

        $stateProvider.state('genre.delete', {
            url: '/delete/:id',
            templateUrl: 'client/app/genre/details.delete.tmp.html',
            controller: 'GenreCtrl',
            controllerAs: 'vm',
            params: {
                action: 'delete',
                header: 'Are you sure you want to delete this genre?'
            }
        });

        $stateProvider.state('genre.create', {
            url: '/create',
            templateUrl: 'client/app/genre/create.edit.tmp.html',
            controller: 'GenreCtrl',
            controllerAs: 'vm',
            params: {
                action: 'create',
                header: 'Create new genre'
            }
        });

        $stateProvider.state('genre.edit', {
            url: '/edit/:id',
            templateUrl: 'client/app/genre/create.edit.tmp.html',
            controller: 'GenreCtrl',
            controllerAs: 'vm',
            params: {
                action: 'edit',
                header: 'Edit genre'
            }
        });
    }
} ());