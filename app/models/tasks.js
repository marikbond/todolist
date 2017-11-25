var connectionPool = require('./index');
var dateformat = require('dateformat');

var TaskAPI = {
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
        }, params);
    },
    findById: function () {
        throw new Error('Unsupported operation');
    }
};

function extractTasks(results) {
    var tasks = [];
    results.forEach(function (row) {
        tasks.push(new Task(row));
    });
    return tasks;
}

module.exports = TaskAPI;

function Task(param) {
    this.id = param.id;
    this.title = param.title;
    this.description = param.description;
    this.status = param.status;
    this.creationDate = dateformat(param.creation_date, 'dd-mm-yyyy');
}