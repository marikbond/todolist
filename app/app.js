var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var TaskDAO = require('./models/tasks');
var StatusDAO = require('./models/statuses');

app.get('/', function (req, res) {
    TaskDAO.findAll(function (err, tasks) {
        if (err) return;
        StatusDAO.findAll(function (err, statuses) {
            if (err) return;
            res.render('index', {
                tasks: tasks,
                statuses: statuses
            });
        });
    });
});

app.get('/search', function (req, res) {
    TaskDAO.find(req.query.query, function (err, tasks) {
        if (err) return;
        res.render('partials/tasks', {tasks: tasks})
    });
});

app.post('/add-task', function (req, res) {
    TaskDAO.save(req.body, function (err, task) {
        if (err) throw err;
        res.render('partials/task', {task: task});
    });
});

var port = process.env.PORT || 8180;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});