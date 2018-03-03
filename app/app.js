var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
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
    async.parallel({
        tasks: TaskDAO.findAll,
        statuses: StatusDAO.findAll
    }, function(err, results) {
        if (err) {
            throw new Error('Exception when render index page');
        }
        res.render('index', results);
    });
});

app.get('/search', function (req, res) {
    TaskDAO.find(req.query.query, function (err, tasks) {
        if (err) return;
        res.render('partials/tasks', {tasks: tasks})
    });
});

app.get('/delete-task/:id', function (req, res) {
    TaskDAO.delete(req.params.id, function (error) {
        res.sendStatus(error ? 503 : 200);
    });
});

app.post('/add-task', function (req, res) {
    TaskDAO.save(req.body, function (err, task) {
        if (err) throw err;
        res.render('partials/task', {task: task});
    });
});

app.post('/modals/:templateName', function (req, res) {
    var templateUrl = 'modals/' + req.params.templateName;
    res.render(templateUrl, req.body);
});

var port = process.env.PORT || 3002;
app.listen(port, function () {
    console.log('Server started on: http://localhost:' + port + '/');
});

/*
* HTTP1.1 POST
* ContentLength: 234234
* host: localhost:3001
  contentType: application/json
*
* {
*    title: 'Buy something',
*    creationDate: '2018-01-01',
*
* }
* */