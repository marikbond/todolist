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
    var queryParams = urlutils.parse(req.url, true).query;
    //TODO найти задачи запросу и отрендерить html с задачими
    res.end(queryParams.query);
});

var port = 3009;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});