/*eslint no-undef: "error"*/
/*eslint-env node*/

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var platformRouter = require('./routes/platformRoutes.js');
var publisherRouter = require('./routes/publisherRoutes.js');
var genreRouter = require('./routes/genreRoutes.js');
var themeRouter = require('./routes/themeRoutes.js');
var bodyParser = require('body-parser');


// db.serialize(function () {
//     db.run("CREATE TABLE books (id TEXT, name TEXT, author TEXT)");

//     var stmt = db.prepare("INSERT INTO books VALUES (?,?,?)");

//     stmt.run(1, 'Java', 'Author1');
//     stmt.run(2, 'JavaScript', 'Author2');
//     stmt.run(3, 'C#', 'Author3');

//     stmt.finalize();
// });
// db.close();

app.use(express.static('./'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/api/platforms', platformRouter);
app.use('/api/publishers', publisherRouter);
app.use('/api/genres', genreRouter);
app.use('/api/themes', themeRouter);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function (err) {
    console.log('Server running on port: ' + port);
});
