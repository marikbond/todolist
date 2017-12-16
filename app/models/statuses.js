var connectionPool = require('./index');

var statusDAO = {
    findAll: function (callback) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var sql = 'SELECT * FROM statuses;';
            connection.query(sql, function (error, results) {
                connection.release();
                if (error) throw error;
                callback(null, extractStatuses(results));
            });
        });
    }
};

function extractStatuses(results) {
    return results.map(function (row) {
        return row.status;
    })
}

module.exports = statusDAO;