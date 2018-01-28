var connectionPool = require('./index');
var dateFormat = require('dateformat');

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
    findById: function (id, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err) throw err;
            var sql = [
                'select *',
                'from tasks t left join statuses s on t.status = s.id',
                'where t.id = ' + id
            ].join(' ');
            connection.query(sql, function (err, results) {
                connection.release();
                if (err) throw err;
                callback(null, new TaskDTO(results[0]));
            })
        })
    },
    save: function (params, callback) {
        var self = this;
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            connection.query('INSERT INTO tasks SET ?', params, function (error, results) {
                connection.release();
                if (error) throw error;
                self.findById(results.insertId, callback);
            });
        });
    },
    delete: function (id, callback) {
        var sql = "DELETE FROM tasks WHERE id=" + id;
        connectionPool.getConnection(function (err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            connection.query(sql, function (error) {
                connection.release();
                callback(error);
            })
        })
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
    this.creationDate = dateFormat(param.creation_date, 'dd-mm-yyyy');
}