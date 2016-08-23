(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('helperService', helperService);

    helperService.$inject = [];
    function helperService() {
        var service = this;
        service.prepareGame = prepareGame;

        return service;

        ////////////////

        function prepareGame(game) {
            game.publishers = game.publishers.map(function (e) {
                return { id: e.id, name: e.name, toString: function () { return this.name; } };
            });
            game.platforms = game.platforms.map(function (e) {
                return { id: e.id, name: e.name, toString: function () { return this.name; } };
            });
            game.themes = game.themes.map(function (e) {
                return { id: e.id, name: e.name, toString: function () { return this.name; } };
            });
            game.genres = game.genres.map(function (e) {
                return { id: e.id, name: e.name, toString: function () { return this.name; } };
            });
            game.releaseDate = new Date(game.releaseDate);

            return game;
        }
    }
})();