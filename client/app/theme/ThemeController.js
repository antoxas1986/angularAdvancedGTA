(function () {
    'use strict';

    angular
        .module('app.theme')
        .controller('ThemeCtrl', ThemeCtrl);

    ThemeCtrl.$inject = ['$state', 'themeService', 'toaster', '$stateParams', '$scope'];

    /* @ngInject */
    function ThemeCtrl($state, themeService, toaster, $stateParams, $scope) {
        var vm = this;
        vm.themes = [];
        vm.theme = {};
        
        vm.games = $stateParams.games;

        vm.updateTheme = updateTheme;
        vm.createTheme = createTheme;

        vm.header = $stateParams.header;
        vm.action = $stateParams.action;

        activate();

        return vm;

        /////////////////////////////////////////////////////////////////////////////////////

        function createTheme(theme) {
            themeService.createTheme(theme).then(function () {
                $scope.$emit('msgEvent', { msg: 'theme ' + theme.name + ' create.' });
                $state.go('theme.list');
            });
        }

        function updateTheme(theme) {
            themeService.updateTheme(theme).then(function () {
                $scope.$emit('msgEvent', { msg: 'theme ' + theme.name + ' updated.' });
                $state.go('theme.list');
            });
        }

        function activate() {
            if (angular.isDefined($stateParams.id)) {
                return getThemeById();
            } else {
                return getThemes();
            }
        }

        function getThemes() {
            return themeService.getTheme().then(function (data) {
                vm.themes = data;
                return vm.themes;
            });
        }

        function getThemeById() {
            themeService.getThemeById($stateParams.id).then(function (theme) {
                vm.theme = theme;
                return vm.theme;
            });
        }
    }
})();