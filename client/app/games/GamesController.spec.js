/* eslint-disable */
/* jshint -W117 */

describe('GamesController', function () {

    var controller, scope, gs, pubService, platService, genService,ts;
    var games = [{ id: 1 }, { id: 2 }];
    var $stateParams = { id: 1 };
    beforeEach(function () {
        bard.appModule('app.games');
        bard.inject('$controller', '$rootScope', '$q', 'gamesService');
        scope = $rootScope.$new();
        gs = {
            getGames: function () {
                return $q.when(games);
            },
            getGameById: function () {
                return $q.when({ id: 1 });
            }
        };
        pubService = {
            getPublisher: function(){
                return $q.when();
            }
        };
        platService = {
            getPlatform: function(){
                return $q.when();
            }
        };
        genService = {
            getGenre: function(){
                return $q.when();
            }
        };
        ts = {
            getTheme: function(){
                return $q.when();
            }
        };

        controller = $controller('GamesCtrl',
            {
                $scope: scope,
                gamesAmount: 0,
                gamesService: gs,
                publisherService: pubService,
                platformService: platService,
                themeService: ts,
                genreService: genService, 
            });
        $rootScope.$apply();
    });

    it('should be defind', function () {
        expect(controller).toBeDefined();
    });

    it('should have games', function () {
        expect(controller.games.length).toBe(games.length);
    });

    it('should have right amount of games', function () {
        expect(controller.gamesAmount).toBe(games.length);
    });

    it('should show help alert', function () {
        expect(controller.showHelpAlert).toBe(true);
    });

    it('should have one game', function () {
        expect(controller.game).toBeDefined();
    });

});