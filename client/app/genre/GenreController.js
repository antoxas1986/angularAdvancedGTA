(function () {
    'use strict';

    angular
        .module('app.genre')
        .controller('GenreCtrl', GenreCtrl);

    GenreCtrl.$inject = ['$state', 'genreService', 'toaster', '$stateParams', '$scope'];

    /* @ngInject */
    function GenreCtrl($state, genreService, toaster, $stateParams, $scope) {
        var vm = this;
        vm.genres = [];
        vm.genre = {};
        
        vm.games = $stateParams.games;
        vm.loading = true;

        vm.updateGenre = updateGenre;
        vm.createGenre = createGenre;

        vm.header = $stateParams.header;
        vm.action = $stateParams.action;

        activate();

        return vm;

        /////////////////////////////////////////////////////////////////////////////////////

        function createGenre(genre) {
            genreService.createGenre(genre).then(function () {
                $scope.$emit('msgEvent', { msg: 'genre ' + genre.name + ' create.' });
                $state.go('genre.list');
            });
        }

        function updateGenre(genre) {
            genreService.updateGenre(genre).then(function () {
                $scope.$emit('mGgEvent', { msg: 'genre ' + genre.name + ' updated.' });
                $state.go('genre.list');
            });
        }

        function activate() {
            if (angular.isDefined($stateParams.id)) {
                return getGenreById();
            } else {
                return getGenres();
            }
        }

        function getGenres() {
            return genreService.getGenre().then(function (data) {
                vm.genres = data;
                vm.loading = false;
                return vm.genres;
            });
        }

        function getGenreById() {
            genreService.getGenreById($stateParams.id).then(function (genre) {
                vm.genre = genre;
                vm.loading = false;
                return vm.genre;
            });
        }
    }
})();