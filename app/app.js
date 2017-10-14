var express = require('express');
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3008, function () {
    console.log('Example app listening on port 3000!');
});



// var mysql = require('mysql');
//
// var pool = mysql.createPool({
//     connectionLimit : 20,
//     host            : 'localhost',
//     user            : 'root',
//     password        : 'root',
//     database        : 'todolist'
// });
//
// pool.getConnection(function(err, connection) {
//     if (err) {
//         console.error('ERROR connecting!: ' + err.stack);
//         return;
//     }
//     connection.query('SELECT * FROM tasks', function (error, results, fields) {
//         connection.release();
//         if (error) throw error;
//         results.forEach(function (row) {
//             console.log(row);
//         });
//     });
// });
