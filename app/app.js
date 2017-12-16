var express = require('express');
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));

var Task = require('./models/tasks');
var Status = require('./models/statuses');

app.get('/', function (req, res) {
    Task.findAll(function (err, tasks) {
        if (err) return;
        Status.findAll(function (err, statuses) {
            if (err) return;
            res.render('index', {
                tasks: tasks,
                statuses: statuses
            });
        });
    });
});

app.get('/search', function (req, res) {
    Task.find(req.query.query, function (err, tasks) {
        if (err) return;
        res.render('partials/tasks', {tasks: tasks})
    });
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});