(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$state', 'APP_NAME'];
    function HomeCtrl($state, APP_NAME) {
        var vm = this;
        vm.goToHome = goToHome;
        vm.notesCollapsed = true;
        vm.appName = APP_NAME;
        vm.video = 'QP55pOqNYq4';


        activate();

        ////////////////

        function goToHome() {
            $state.go('home');
        }

        function activate() {
            var header = angular.element('#header');
            header.arctext({ radius: 500 });
        }


    }
})();