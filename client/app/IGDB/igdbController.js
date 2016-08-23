(function () {
    'use strict';

    angular
        .module('app.games')
        .controller('IgdbCtrl', IgdbCtrl);

    IgdbCtrl.$inject = ['igdbFactory', '$stateParams', 'toaster', 'gamesService', '$scope', '$state'];

    function IgdbCtrl(igdbFactory, $stateParams, toaster, gamesService, $scope, $state) {
        var vm = this;
        vm.games;
        vm.mappedGames = [];
        vm.header = $stateParams.header;
        vm.getIGDBGames = getIGDBGames;
        vm.addToCollection = addToCollection;

        //////////////////////////////////////////////////

        function addToCollection(game) {
            game.releaseDate = new Date(game.releaseDate).toISOString().slice(0, 10);
            gamesService.createGame(game).then(function () {
                $scope.$emit('msgEvent', { msg: 'Game ' + game.name + ' created.' });
                $state.go('games.list');
            });
        }

        function getIGDBGames(name) {
            vm.mappedGames = [];
            var myGames = [];

            gamesService.getGames().then(function (data) {
                myGames = data;
            });

            var gameOptions = getGameOptions(name);

            igdbFactory.getStuff(gameOptions, 'games/').then(function (data) {
                vm.games = data.data;
                vm.games.forEach(function (game) {
                    var mappedGame = {};
                    var itemOptions = { 'fields': 'name' };
                    mappedGame.name = game.name;
                    mappedGame.igdbId = game.id;
                    mappedGame.summary = game.summary ? game.summary : 'There is no description for this game.';
                    mappedGame.rating = game.rating ? (game.rating / 10).toFixed(1) : 0;
                    mappedGame.isOwn = false;

                    if (game.publishers) {
                        igdbFactory.getStuff(itemOptions, 'companies/', game.publishers).then(function (data) {
                            mappedGame.publishers = data.data;
                        });
                    }
                    if (game.release_dates) {
                        mappedGame.releaseDate = game.release_dates[0].date;

                        var platformsIds = game.release_dates.map(function (e) { return e.platform; });
                        platformsIds = platformsIds.filter(function (item, pos) { return platformsIds.indexOf(item) == pos; });

                        igdbFactory.getStuff(itemOptions, 'platforms/', platformsIds).then(function (data) {
                            mappedGame.platforms = data.data;
                        });
                    }
                    if (game.genres) {
                        igdbFactory.getStuff(itemOptions, 'genres/', game.genres).then(function (data) {
                            mappedGame.genres = data.data;
                        });
                    }
                    if (game.themes) {
                        igdbFactory.getStuff(itemOptions, 'themes/', game.themes).then(function (data) {
                            mappedGame.themes = data.data;
                        });
                    }
                    if (game.cover) {
                        mappedGame.image = game.cover.cloudinary_id;
                    }
                    if (myGames.map(function (e) { return e.name; }).indexOf(mappedGame.name) != -1) {
                        mappedGame.isOwn = true;
                    }
                    vm.mappedGames.push(mappedGame);
                });
            });
        }

        function getGameOptions(name) {
            var gameOptions = {};
            if (name) {
                gameOptions = {
                    'fields': 'name,publishers,release_dates,cover,summary,rating,themes,genres',
                    'search': name
                };
            } else {
                gameOptions = {
                    'fields': 'name,publishers,release_dates,cover,summary,rating,themes,genres',
                };
            }
            return gameOptions;
        }
    }
})();