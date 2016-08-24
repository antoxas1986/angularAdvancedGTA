/*eslint no-undef: "error"*/
/*eslint-env node*/

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./server/database/gta.db');
var async = require('async');

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
                    res.send(game);
                });
            });
        });
    });
router.route('/')
    .post(function (req, res) {
        var game = req.body;
        console.log(game);
        db.all('select max(id) as id from games', function (err, data) {
            game.id = data[0]['id'] + 1;
            db.run('insert into games(id, name, rating, releaseDate, summary, igdbId, image) values(?,?,?,?,?,?,?)',
                [game.id, game.name, game.rating, game.releaseDate, game.summary, game.igdb, game.image]);

            async.forEach(game.genres, function (genre, next) {
                insert(genre, next);
            });
            async.forEach(game.platforms, function (platform, next) {
                inserPlatform(platform, next);
            });

            function inserPlatform(platform, callback) {
                db.all('select * from platforms where name = ?', [platform.name], function (err, data) {
                    if (data.length > 0) {
                        db.run('insert into game_platform(gameId, platformId) values(?,?)', [game.id, data[0].id]);
                        callback();
                    } else {
                        db.all('select max(id) as id from platforms', function (err, data) {
                            platform.id = data[0]['id'] + 1;
                            db.run('insert into platforms(id, name) values(?,?)', [platform.id, platform.name]);
                            db.run('insert into game_platform(gameId, platformId) values(?,?)', [game.id, platform.id]);
                            callback();
                        });
                    }
                });
            }

            function insert(genre, callback) {
                console.log('1');
                db.all('select * from genres where name = ?', [genre.name], function (err, data) {
                    console.log('2');
                    if (data.length > 0) {
                        db.run('insert into game_genre(gameId, genreId) values(?,?)', [game.id, data[0].id]);
                        callback();
                        console.log('3');
                    } else {
                        db.all('select max(id) as id from genres', function (err, data) {
                            genre.id = data[0]['id'] + 1;
                            db.run('insert into genres(id, name) values(?,?)', [genre.id, genre.name]);
                            db.run('insert into game_genre(gameId, genreId) values(?,?)', [game.id, genre.id]);
                            callback();
                            console.log('3');
                        });
                    }
                });
            }

            // game.genres.forEach(function (genre) {
            //     console.log(genre);
            //     console.log('1');
            //     db.serialize(function () {
            //         db.all('select * from genres where name = ?', [genre.name], function (err, data) {
            //             console.log(data);
            //             console.log('2');
            //             if (data || data.length > 0) {
            //                 db.run('insert into game_genre(gameId, genreId) values(?,?)', [game.id, data[0].id]);
            //                 console.log('join');
            //                 console.log('3');
            //             } else {
            //                 db.all('select max(id) as id from genres', function (err, data) {
            //                     genre.id = data[0]['id'] + 1;
            //                     db.run('insert into genres(id, name) values(?,?)', [genre.id, genre.name]);
            //                     db.run('insert into game_genre(gameId, genreId) values(?,?)', [game.id, genre.id]);
            //                     console.log('new');
            //                     console.log('3');
            //                 });
            //             }
            //         });
            //     });

            //     db.close();
            // });


        });
        res.send('game insert');
    });

router.route('/:id')
    .delete(function (req, res) {
        db.run('delete from games where id = ' + req.params.id, function (err, data) {
            db.run('delete from game_genre where gameId = ?', [req.params.id]);
            db.run('delete from game_platform where gameId = ?', [req.params.id]);
            res.send('game deleted');
        });
    });
router.route('/')
    .put(function (req, res) {
        var game = req.body;
        db.run('update games set id = ?, name = ? where id = ?', [game.id, game.name, game.id], function (err, data) {
            res.send('game updated');
        });
    });

module.exports = router;
