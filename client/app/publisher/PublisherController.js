(function () {
    'use strict';

    angular
        .module('app.publisher')
        .controller('PublisherCtrl', PublisherCtrl);

    PublisherCtrl.$inject = ['$state', 'publisherService', 'toaster', '$stateParams', '$scope'];

    /* @ngInject */
    function PublisherCtrl($state, publisherService, toaster, $stateParams, $scope) {
        var vm = this;
        vm.publishers = [];
        vm.publisher = {};
        
        vm.games = $stateParams.games;

        vm.updatePublisher = updatePublisher;
        vm.createPublisher = createPublisher;

        vm.header = $stateParams.header;
        vm.action = $stateParams.action;

        activate();

        return vm;

        /////////////////////////////////////////////////////////////////////////////////////

        function createPublisher(publisher) {
            publisherService.createPublisher(publisher).then(function () {
                $scope.$emit('msgEvent', { msg: 'publisher ' + publisher.name + ' create.' });
                $state.go('publisher.list');
            });
        }

        function updatePublisher(publisher) {
            publisherService.updatePublisher(publisher).then(function () {
                $scope.$emit('msgEvent', { msg: 'publisher ' + publisher.name + ' updated.' });
                $state.go('publisher.list');
            });
        }

        function activate() {
            if (angular.isDefined($stateParams.id)) {
                return getPublisherById();
            } else {
                return getPublishers();
            }
        }

        function getPublishers() {
            return publisherService.getPublisher().then(function (data) {
                vm.publishers = data;
                return vm.publishers;
            });
        }

        function getPublisherById() {
            publisherService.getPublisherById($stateParams.id).then(function (publisher) {
                vm.publisher = publisher;
                return vm.publisher;
            });
        }
    }
})();