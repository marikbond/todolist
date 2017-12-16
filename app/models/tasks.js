var connectionPool = require('./index');
var dateformat = require('dateformat');

var TaskDAO = {
    findAll: function (callback) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var sql = 'SELECT * FROM tasks';
            connection.query(sql, function (error, results) {
                connection.release();
                if (error) throw error;
                callback(null, extractTasks(results));
            });
        });
    },
    find: function (params, callback) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var sql = 'SELECT * FROM Tasks WHERE title LIKE ' + "'%" + params + "%'";
            connection.query(sql, function (error, results) {
                connection.release();
                if (error) throw error;
                callback(null, extractTasks(results));
            });
        });
    },
    findById: function () {
        throw new Error('Unsupported operation');
    },
    save: function (task) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var task = {
                title: 'Title',
                description: 'description',
                status: 'NOT STARTED'
            };
            connection.query('INSERT INTO posts SET ?', task, function (error, results, fields) {
                if (error) throw error;
                console.log(results.insertId);
            });
        });
    }
};

function extractTasks(results) {
    var tasks = [];
    results.forEach(function (row) {
        tasks.push(new Task(row));
    });
    return tasks;
}

module.exports = TaskDAO;

function Task(param) {
    this.id = param.id;
    this.title = param.title;
    this.description = param.description;
    this.status = param.status;
    this.creationDate = dateformat(param.creation_date, 'dd-mm-yyyy');
}