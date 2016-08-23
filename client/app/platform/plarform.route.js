(function () {
    'use strict';

    angular
        .module('app.platform')
        .config(platformRoute);

    platformRoute.$inject = ['$stateProvider'];

    function platformRoute($stateProvider) {

        $stateProvider.state('platform', {
            absract: true,
            url: '/platform',
            template: '<ui-view />',
        });

        $stateProvider.state('platform.list', {
            url: '/list',
            templateUrl: 'client/app/platform/index.tmp.html',
            controller: 'PlatformCtrl',
            controllerAs: 'vm',
        });

        // $stateProvider.state('platform.details', {
        //     url: '/details/:id',
        //     templateUrl: 'client/app/platform/details.delete.tmp.html',
        //     controller: 'PlatformCtrl',
        //     controllerAs: 'vm',
        //     params: {
        //         action: 'details',
        //         header: 'Details for your platform'
        //     }
        // });

        $stateProvider.state('platform.delete', {
            url: '/delete/:id',
            templateUrl: 'client/app/platform/details.delete.tmp.html',
            controller: 'PlatformCtrl',
            controllerAs: 'vm',
            params: {
                action: 'delete',
                header: 'Are you sure you want to delete this platform?'
            }
        });

        $stateProvider.state('platform.create', {
            url: '/create',
            templateUrl: 'client/app/platform/create.edit.tmp.html',
            controller: 'PlatformCtrl',
            controllerAs: 'vm',
            params: {
                action: 'create',
                header: 'Create new platform'
            }
        });

        $stateProvider.state('platform.edit', {
            url: '/edit/:id',
            templateUrl: 'client/app/platform/create.edit.tmp.html',
            controller: 'PlatformCtrl',
            controllerAs: 'vm',
            params: {
                action: 'edit',
                header: 'Edit platform'
            }
        });
    }
} ());