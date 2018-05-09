var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.redirect('/tasks/');
});

app.get('/signUp', function (req, res) {
    res.render('signUp');
});

app.use('/tasks', require('./routes/taskRoutes'));
app.use('/modals', require('./routes/modalRoutes'));

var port = process.env.PORT || 3007;
app.listen(port, function () {
    console.log('Server started on: http://localhost:' + port + '/');
});