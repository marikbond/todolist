var connectionPool = require('./index');
var dateUtils = require('../common/dateUtils');

var TaskAPI = {
    findAll: function (callback) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var sql = 'SELECT * FROM tasks';
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                var tasks = [];
                results.forEach(function (row) {
                    tasks.push(new Task(row));
                });
                callback(null, tasks);
            });
        });
    },
    find: function (callback, params) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var sql = 'SELECT * FROM Tasks WHERE title LIKE ' + "'" + params + "'"; //TODO <-- Has to work with searchData
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) throw error;
                var tasks = [];
                results.forEach(function (row) {
                    tasks.push(new Task(row));
                });
                callback(null, tasks);
            });
        }, params);
    },
    findById: function () {
        throw new Error('Unsupported operation');
    }
};

module.exports = TaskAPI;

function Task(param) {
    this.id = param.id;
    this.title = param.title;
    this.description = param.description;
    this.status = param.status;
    this.creationDate = dateUtils.format(param.creation_date);
}