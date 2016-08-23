(function () {
    'use strict';

    angular
        .module('app.theme')
        .config(themeRoute);

    themeRoute.$inject = ['$stateProvider'];

    function themeRoute($stateProvider) {

        $stateProvider.state('theme', {
            absract: true,
            url: '/theme',
            template: '<ui-view />',
        });

        $stateProvider.state('theme.list', {
            url: '/list',
            templateUrl: 'client/app/theme/index.tmp.html',
            controller: 'ThemeCtrl',
            controllerAs: 'vm',
        });

        $stateProvider.state('theme.delete', {
            url: '/delete/:id',
            templateUrl: 'client/app/theme/details.delete.tmp.html',
            controller: 'ThemeCtrl',
            controllerAs: 'vm',
            params: {
                action: 'delete',
                header: 'Are you sure you want to delete this theme?'
            }
        });

        $stateProvider.state('theme.create', {
            url: '/create',
            templateUrl: 'client/app/theme/create.edit.tmp.html',
            controller: 'ThemeCtrl',
            controllerAs: 'vm',
            params: {
                action: 'create',
                header: 'Create new theme'
            }
        });

        $stateProvider.state('theme.edit', {
            url: '/edit/:id',
            templateUrl: 'client/app/theme/create.edit.tmp.html',
            controller: 'ThemeCtrl',
            controllerAs: 'vm',
            params: {
                action: 'edit',
                header: 'Edit theme'
            }
        });
    }
} ());