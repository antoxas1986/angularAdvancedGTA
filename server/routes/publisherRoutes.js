/*eslint no-undef: "error"*/
/*eslint-env node*/

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./server/database/gta.db');

router.route('/')
    .get(function (req, res) {
        db.all('select * from publishers', function (err, data) {
            res.send(data);
        });
    });
router.route('/:id')
    .get(function (req, res) {
        db.all('select * from publishers where id = ' + req.params.id, function (err, data) {
            res.send(data);
        });
    });
router.route('/')
    .post(function (req, res) {
        var platform = req.body;
        db.all('select max(id) as id from publishers', function (err, data) {
            platform.id = parseInt(data[0]['id'], 10) + 1;
            db.run('insert into publishers(id, name) values(?,?)', [platform.id, platform.name]);
        });
        res.send('platform insert');
    });

router.route('/:id')
    .delete(function (req, res) {
        db.run('delete from publishers where id = ' + req.params.id, function (err, data) {
            res.send('platform deleted');
        });

    });

module.exports = router;
