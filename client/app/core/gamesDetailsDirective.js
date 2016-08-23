(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('gamesDetail', gamesDetail);

    gamesDetail.$inject = [];

    function gamesDetail() {
        var GamesDetail = {
            restrict: 'AE',
            scope: {
                game: '=info',
                someCtrlFn: '&callbackFn'
            },
            templateUrl: 'client/app/core/gameDetails.tmp.html',
            controller: function ($scope) {
                $scope.addToCollection = function (game) {
                    this.someCtrlFn(game);
                };
            }
        };
        return GamesDetail;
    }

})();