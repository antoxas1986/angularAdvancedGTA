(function () {

    'use strict';

    angular.module('app', [
        'app.core',
        'app.games',
        'app.publisher',
        'app.platform',
        'app.theme',
        'app.genre'
    ])
        .run(function () {})
        .value('gamesAmount', 0)
        .constant('APP_NAME', 'Game Tracker Advanced');


})();