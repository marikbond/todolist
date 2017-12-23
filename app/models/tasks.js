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
            var sql = 'SELECT * FROM tasks_with_statuses';
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
            connection.query('INSERT INTO tasks SET ?', task, function (error, results) {
                if (error) throw error;
                console.log(results.insertId);
            });
        });
    }
};

function extractTasks(results) {
    return results.map(function (row) {
        return new TaskDTO(row);
    });
}

module.exports = TaskDAO;

function TaskDTO(param) {
    this.id = param.id;
    this.title = param.title;
    this.description = param.description;
    this.status = param.status;
    this.creationDate = dateformat(param.creation_date, 'dd-mm-yyyy');
}