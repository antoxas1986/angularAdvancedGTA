(function () {
    'use strict';

    angular
        .module('app.games')
        .controller('HelperCtrl', HelperController);

    HelperController.$inject = ['themeService', '$stateParams', 'platformService', 'genreService', 'publisherService', '$scope', '$state'];
    function HelperController(themeService, $stateParams, platformService, genreService, publisherService, $scope, $state) {
        var vm = this;

        vm.games = [];
        vm.header = $stateParams.header;
        vm.type = $stateParams.type;
        vm.typeObject = {};

        vm.loading = true;

        vm.deletePlatform = deletePlatform;
        vm.deletePublisher = deletePublisher;
        vm.deleteGenre = deleteGenre;
        vm.deleteTheme = deleteTheme;

        activate();

        ////////////////

        function deletePublisher(publisher) {
            publisherService.deletePublisher(publisher).then(function () {
                $scope.$emit('msgEvent', { msg: 'publisher ' + publisher.name + ' deleted.' });
                $state.go('publisher.list');
            });
        }

        function deletePlatform(platform) {
            platformService.deletePlatform(platform).then(function () {
                $scope.$emit('msgEvent', { msg: 'platform ' + platform.name + ' deleted.' });
                $state.go('platform.list');
            });
        }

        function deleteGenre(genre) {
            genreService.deleteGenre(genre).then(function () {
                $scope.$emit('msgEvent', { msg: 'genre ' + genre.name + ' deleted.' });
                $state.go('genre.list');
            });
        }

        function deleteTheme(theme) {
            themeService.deleteTheme(theme).then(function () {
                $scope.$emit('msgEvent', { msg: 'theme ' + theme.name + ' deleted.' });
                $state.go('theme.list');
            });
        }

        function activate() {
            switch ($stateParams.type) {
            case 'theme':
                getGamesByTheme();
                break;
            case 'platform':
                getGamesByPlatform();
                break;
            case 'genre':
                getGamesByGenre();
                break;
            case 'publisher':
                getGamesByPublisher();
                break;
            }
        }

        function getGamesByTheme() {
            vm.games = [];
            themeService.getGamesByTheme($stateParams.id).then(function (data) {
                vm.games = data.games;
                vm.typeObject = data.type;
                vm.loading = false;
            });
        }

        function getGamesByPlatform() {
            vm.games = [];
            platformService.getGamesByPlatform($stateParams.id).then(function (data) {
                vm.games = data.games;
                vm.typeObject = data.type;
                vm.loading = false;
            });
        }

        function getGamesByGenre() {
            vm.games = [];
            genreService.getGamesByGenre($stateParams.id).then(function (data) {
                vm.games = data.games;
                vm.typeObject = data.type;
                vm.loading = false;
            });
        }

        function getGamesByPublisher() {
            vm.games = [];
            publisherService.getGamesByPublisher($stateParams.id).then(function (data) {
                vm.games = data.games;
                vm.typeObject = data.type;
                vm.loading = false;
            });
        }
    }
})();