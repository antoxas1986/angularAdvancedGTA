/*eslint no-undef: "error"*/
/*eslint-env node*/

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./server/database/gta.db');
var async = require('async');
var winston = require('winston');
var uuid = require('node-uuid');

router.route('/')
    .get(function (req, res) {
        db.all('select * from games', function (err, data) {
            res.send(data);
        });
    });

router.route('/:id')
    .get(function (req, res) {
        db.all('select * from games where id = ' + req.params.id, function (err, data) {
            var game = data[0];
            db.all('select id, name from genres join game_genre on id = genreId where gameId = ?', [game.id], function (err, data) {
                game.genres = data;
                db.all('select id, name from platforms join game_platform on id = platformId where gameId = ?', [game.id], function (err, data) {
                    game.platforms = data;
                    db.all('select id, name from themes join game_theme on id = themeId where gameId = ?', [game.id], function (err, data) {
                        game.themes = data;
                        db.all('select id, name from publishers join game_publisher on id = publisherId where gameId = ?', [game.id], function (err, data) {
                            game.publishers = data;
                            winston.log('info', 'game ready');
                            res.send(game);
                        });
                    });
                });
            });
        });
    });

router.route('/')
    .post(function (req, res) {
        var game = req.body;
        winston.log('info', 'insering game', { inserting: game });
        db.all('select max(id) as id from games', function (err, data) {
            game.id = data[0]['id'] + 1;
            db.run('insert into games(id, name, rating, releaseDate, summary, igdbId, image) values(?,?,?,?,?,?,?)',
                [game.id, game.name, game.rating, game.releaseDate, game.summary, game.igdb, game.image]);

            async.forEach(game.genres, function (genre, next) {
                db.all('select * from genres where name = ?', [genre.name], function (err, data) {
                    insertGenre(genre, next, data);
                });
            });

            async.forEach(game.platforms, function (platform, next) {
                db.all('select * from platforms where name = ?', [platform.name], function (err, data) {
                    insertPlatform(platform, next, data);
                });
            });

            async.forEach(game.publishers, function (publisher, next) {
                db.all('select * from publishers where name = ?', [publisher.name], function (err, data) {
                    insertPublisher(publisher, next, data);
                });
            });

            async.forEach(game.themes, function (theme, next) {
                db.all('select * from themes where name = ?', [theme.name], function (err, data) {
                    insertTheme(theme, next, data);
                });
            });

            function insertTheme(theme, callback, data) {
                if (data.length > 0) {
                    db.run('insert into game_theme(gameId, themeId) values(?,?)', [game.id, data[0].id], function () {
                        winston.log('info', 'exist theme, insert to join table');
                        callback();
                    });

                } else {
                    theme.id = uuid.v1();
                    db.run('insert into themes(id, name) values(?,?)', [theme.id, theme.name]);
                    db.run('insert into game_theme(gameId, themeId) values(?,?)', [game.id, theme.id], function () {
                        winston.log('info', 'create theme, insert to join table');
                        callback();
                    });
                }
            }

            function insertPublisher(publisher, callback, data) {
                if (data.length > 0) {
                    db.run('insert into game_publisher(gameId, publisherId) values(?,?)', [game.id, data[0].id], function () {
                        winston.log('info', 'exist publisher, insert to join table');
                        callback();
                    });

                } else {
                    publisher.id = uuid.v1();
                    db.run('insert into publishers(id, name) values(?,?)', [publisher.id, publisher.name]);
                    db.run('insert into game_publisher(gameId, publisherId) values(?,?)', [game.id, publisher.id], function () {
                        winston.log('info', 'create publisher, insert to join table');
                        callback();
                    });
                }
            }

            function insertPlatform(platform, callback, data) {
                if (data.length > 0) {
                    db.run('insert into game_platform(gameId, platformId) values(?,?)', [game.id, data[0].id], function () {
                        winston.log('info', 'exist platfrom, insert to join table');
                        callback();
                    });

                } else {
                    platform.id = uuid.v1();
                    db.run('insert into platforms(id, name) values(?,?)', [platform.id, platform.name]);
                    db.run('insert into game_platform(gameId, platformId) values(?,?)', [game.id, platform.id], function () {
                        winston.log('info', 'create platfrom, insert to join table');
                        callback();
                    });
                }
            }

            function insertGenre(genre, callback, data) {
                if (data.length > 0) {
                    db.run('insert into game_genre(gameId, genreId) values(?,?)', [game.id, data[0].id], function () {
                        winston.log('info', 'exist genre, insert to join table');
                        callback();
                    });
                } else {
                    genre.id = uuid.v1();
                    db.run('insert into genres(id, name) values(?,?)', [genre.id, genre.name]);
                    db.run('insert into game_genre(gameId, genreId) values(?,?)', [game.id, genre.id], function () {
                        winston.log('info', 'create genre, insert to join table');
                        callback();
                    });
                }
            }
        });
        winston.log('info', 'game inserted');
        res.send('game insert');
    });

router.route('/:id')
    .delete(function (req, res) {
        db.run('delete from games where id = ' + req.params.id, function (err, data) {
            db.run('delete from game_genre where gameId = ?', [req.params.id]);
            db.run('delete from game_platform where gameId = ?', [req.params.id]);
            db.run('delete from game_publisher where gameId = ?', [req.params.id]);
            db.run('delete from game_theme where gameId = ?', [req.params.id]);
            winston.log('info', 'game deleted');
            res.send('game deleted');
        });
    });

router.route('/')
    .put(function (req, res) {
        var game = req.body;
        db.run('update games set id = ?, name = ?, rating = ?, releaseDate=?, igdbId =?, summary =?, image =? where id = ?',
            [game.id, game.name, game.rating, game.releaseDate, game.igdbId, game.summary, game.image, game.id],
            function (err, data) {
                winston.log('info', 'game updated');
                res.send('game updated');
            });
    });

module.exports = router;
