(function () {
    'use strict';

    angular
        .module('app.publisher')
        .config(publisherRoute);

    publisherRoute.$inject = ['$stateProvider'];

    function publisherRoute($stateProvider) {

        $stateProvider.state('publisher', {
            absract: true,
            url: '/publisher',
            template: '<ui-view />',
        });

        $stateProvider.state('publisher.list', {
            url: '/list',
            templateUrl: 'client/app/publisher/index.tmp.html',
            controller: 'PublisherCtrl',
            controllerAs: 'vm',
        });

        // $stateProvider.state('publisher.details', {
        //     url: '/details/:id',
        //     templateUrl: 'client/app/publisher/details.delete.tmp.html',
        //     controller: 'publisherCtrl',
        //     controllerAs: 'vm',
        //     params: {
        //         action: 'details',
        //         header: 'Details for your publisher'
        //     }
        // });

        $stateProvider.state('publisher.delete', {
            url: '/delete/:id',
            templateUrl: 'client/app/publisher/details.delete.tmp.html',
            controller: 'PublisherCtrl',
            controllerAs: 'vm',
            params: {
                action: 'delete',
                header: 'Are you sure you want to delete this publisher?'
            }
        });

        $stateProvider.state('publisher.create', {
            url: '/create',
            templateUrl: 'client/app/publisher/create.edit.tmp.html',
            controller: 'PublisherCtrl',
            controllerAs: 'vm',
            params: {
                action: 'create',
                header: 'Create new publisher'
            }
        });

        $stateProvider.state('publisher.edit', {
            url: '/edit/:id',
            templateUrl: 'client/app/publisher/create.edit.tmp.html',
            controller: 'PublisherCtrl',
            controllerAs: 'vm',
            params: {
                action: 'edit',
                header: 'Edit publisher'
            }
        });
    }
} ());