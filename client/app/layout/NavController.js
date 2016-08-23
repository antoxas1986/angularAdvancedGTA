(function () {
    'use strict';

    angular
        .module('app.games')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', 'toaster', 'APP_NAME'];
    /* @ngInject */
    function NavCtrl($scope, toaster, APP_NAME) {
        var vm = this;
        vm.appName = APP_NAME;

        activate();

        return vm;

        ////////////////

        function activate() {
            $scope.$on('msgEvent', function (event, args) {
                toaster.pop('success', args.msg);
            });
        }
    }
})();