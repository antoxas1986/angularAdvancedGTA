/*eslint no-undef: "error"*/
/*eslint-env node*/

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./server/database/gta.db');

router.route('/')
    .get(function (req, res) {
        db.all('select * from genres', function (err, data) {
            res.send(data);
        });
    });
router.route('/:id')
    .get(function (req, res) {
        db.all('select * from genres where id = ' + req.params.id, function (err, data) {
            res.send(data);
        });
    });
router.route('/')
    .post(function (req, res) {
        var genre = req.body;
        db.all('select max(id) as id from genres', function (err, data) {
            genre.id = data[0]['id'] + 1;
            db.run('insert into genres(id, name) values(?,?)', [genre.id, genre.name]);
        });
        res.send('genre insert');
    });

router.route('/:id')
    .delete(function (req, res) {
        db.run('delete from genres where id = ' + req.params.id, function (err, data) {
            res.send('genre deleted');
        });
    });
router.route('/')
    .put(function (req, res) {
        var genre = req.body;
        db.run('update genres set id = ?, name = ? where id = ?', [genre.id, genre.name, genre.id], function (err, data) {
            res.send('genre updated');
        });
    });

module.exports = router;
