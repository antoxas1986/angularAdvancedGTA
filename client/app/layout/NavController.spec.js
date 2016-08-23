/* eslint-disable */
/* jshint -W117 */

describe('NavController', function () {
    var controller, appName;
    beforeEach(function () {
        bard.appModule('app.games');
        bard.inject('$controller', '$rootScope', '$q');
        var scope = $rootScope.$new();
        appName='Test';
        controller = $controller('NavCtrl', { $scope: scope, APP_NAME: appName });
        $rootScope.$apply();
    });

    it('should exist', function () {
        expect(controller).toBeDefined();
    });

    it('should have APP_NAME', function () {
        expect(controller.appName).toBe(appName);
    });
});