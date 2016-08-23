(function () {
    'use strict';

    angular
        .module('app.platform')
        .controller('PlatformCtrl', PlatformCtrl);

    PlatformCtrl.$inject = ['$state', 'platformService', 'toaster', '$stateParams', '$scope'];

    /* @ngInject */
    function PlatformCtrl($state, platformService, toaster, $stateParams, $scope) {
        var vm = this;
        vm.platforms = [];
        vm.platform = {};
        vm.platformsApi = [];
        vm.showHelpAlert = true;
        vm.games = $stateParams.games;

        vm.updatePlatform = updatePlatform;
        vm.createPlatform = createPlatform;

        vm.header = $stateParams.header;
        vm.action = $stateParams.action;

        activate();

        return vm;

        /////////////////////////////////////////////////////////////////////////////////////

        function createPlatform(platform) {
            platformService.createPlatform(platform).then(function () {
                $scope.$emit('msgEvent', { msg: 'platform ' + platform.name + ' create.' });
                $state.go('platform.list');
            });
        }

        function updatePlatform(platform) {
            platformService.updatePlatform(platform).then(function () {
                $scope.$emit('msgEvent', { msg: 'platform ' + platform.name + ' updated.' });
                $state.go('platform.list');
            });
        }

        function activate() {
            if (angular.isDefined($stateParams.id)) {
                return getPlatformById();
            } else {
                return getPlatforms();
            }
        }

        function getPlatforms() {
            return platformService.getPlatform().then(function (data) {
                vm.platforms = data;
                return vm.platforms;
            });
        }

        function getPlatformById() {
            platformService.getPlatformById($stateParams.id).then(function (platform) {
                vm.platform = platform;
                return vm.platform;
            });
        }
    }
})();