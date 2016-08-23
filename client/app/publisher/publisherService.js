(function () {
    'use strict';

    angular
        .module('app.publisher')
        .factory('publisherService', publisherService);

    publisherService.$inject = ['publisherFactory', '$q', '$cacheFactory'];

    function publisherService(publisherFactory, $q, $cacheFactory) {

        return {
            getPublisherById: getPublisherById,
            createPublisher: createPublisher,
            updatePublisher: updatePublisher,
            deletePublisher: deletePublisher,
            getPublisher: getPublisher,
            getGamesByPublisher: getGamesByPublisher

        };

        /////////////////////////////////////////////////////

        function getGamesByPublisher(publisherId) {
            var deferred = $q.defer();
            deletepublisherListCache();
            publisherFactory.getGamesByPublisherId({ id: publisherId }, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getPublisher() {
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('publisherCache');
            if (!dataCache) {
                dataCache = $cacheFactory('publisherCache');
            }

            var summaryFromCache = dataCache.get('publisherList');
            if (summaryFromCache) {
                deferred.resolve(summaryFromCache);
            } else {
                var allpublisher = publisherFactory.query().$promise.then(function (publisherList) {
                    dataCache.put('publisherList', publisherList);
                    return publisherList;

                });
                deferred.resolve(allpublisher);
            }
            return deferred.promise;
        }

        function deletepublisherListCache() {
            var dataCache = $cacheFactory.get('publisherCache');
            if (dataCache) {
                dataCache.remove('publisherList');
            }
        }

        function deletePublisher(publisher) {
            var deferred = $q.defer();
            deletepublisherListCache();
            publisherFactory.delete(publisher, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function updatePublisher(publisher) {
            deletepublisherListCache();
            var deferred = $q.defer();
            publisherFactory.update(publisher, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function createPublisher(publisher) {
            deletepublisherListCache();
            var deferred = $q.defer();
            publisherFactory.save(publisher, function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getPublisherById(id) {
            var deferred = $q.defer();
            var publisher = publisherFactory.get({ id: id }).$promise.then(function (data) {
                return data;
            });
            deferred.resolve(publisher);
            return deferred.promise;
        }
    }
})();