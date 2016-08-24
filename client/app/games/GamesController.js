(function () {
    'use strict';

    angular
        .module('app.games')
        .controller('GamesCtrl', GamesCtrl);

    GamesCtrl.$inject = ['$state', 'gamesService', 'toaster', '$stateParams', 'gamesAmount', '$scope', 'publisherService', 'platformService', 'genreService', 'themeService'];

    /* @ngInject */
    function GamesCtrl($state, gamesService, toaster, $stateParams, gamesAmount, $scope, publisherService, platformService, genreService, themeService) {
        var vm = this;
        vm.games = [];
        vm.themes = [];
        vm.platforms = [];
        vm.genres = [];
        vm.publishers = [];
        vm.game = {};
        vm.gamesApi = [];
        vm.showHelpAlert = true;
        vm.closeAlert = closeAlert;
        vm.loading = true;

        vm.deleteGame = deleteGame;
        vm.updateGame = updateGame;
        vm.create = create;

        vm.header = $stateParams.header;
        vm.action = $stateParams.action;

        activate();

        return vm;

        /////////////////////////////////////////////////////////////////////////////////////



        function create(game) {
            gamesService.createGame(game).then(function () {
                $scope.$emit('msgEvent', { msg: 'Game ' + game.name + ' created.' });
                $state.go('games.list');
            });
        }

        function updateGame(game) {
            gamesService.updateGame(game).then(function () {
                $scope.$emit('msgEvent', { msg: 'Game ' + game.name + ' updated.' });
                $state.go('games.list');
            });
        }

        function deleteGame(game) {
            gamesService.deleteGame(game).then(function () {
                $scope.$emit('msgEvent', { msg: 'Game ' + game.name + ' deleted.' });
                $state.go('games.list');
            });
        }

        function activate() {
            publisherService.getPublisher().then(function (data) {
                vm.publishers = data;
            });
            platformService.getPlatform().then(function (data) {
                vm.platforms = data;
            });
            genreService.getGenre().then(function (data) {
                vm.genres = data;
            });
            themeService.getTheme().then(function (data) {
                vm.themes = data;
            });
            if (angular.isDefined($stateParams.id)) {
                return getGameById();
            } else {
                return getGames();
            }
        }

        function getGames() {
            return gamesService.getGames().then(function (data) {
                vm.games = data;
                gamesAmount = vm.games.length;
                vm.gamesAmount = gamesAmount;
                vm.loading = false;
                return vm.games;
            });
        }

        function getGameById() {
            gamesService.getGameById($stateParams.id).then(function (game) {
                vm.game = game;
                vm.loading = false;
                return vm.game;
            });
        }

        function closeAlert() {
            vm.showHelpAlert = false;
        }
    }
})();