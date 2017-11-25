var express = require('express');
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));

var Task = require('./models/tasks');

app.get('/', function (req, res) {
    Task.findAll(function (err, tasks) {
        if (err) return;
        res.render('index', {tasks: tasks});
    });
});

app.get('/search', function (req, res) {
    Task.find(req.query.query, function (err, tasks) {
        if (err) return;
        res.render('partials/tasks', {tasks: tasks})
    });
});

var port = 3009;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});