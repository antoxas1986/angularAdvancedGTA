(function () {
    'use strict';

    angular
        .module('app')
        .config(homeRoute);

    homeRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function homeRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'client/app/layout/home.tmp.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        });
    }
} ());