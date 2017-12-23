var connectionPool = require('./index');

/* Data Access Object */
var statusDAO = {
    findAll: function (callback) {
        connectionPool.getConnection(function(err, connection) {
            if (err) {
                console.error('ERROR connecting!: ' + err.stack);
                callback(err);
                return;
            }
            var sql = 'SELECT id, status FROM statuses ORDER BY `order`;';
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
        return new StatusDTO(row);
    })
}

module.exports = statusDAO;

/* Data Transfer Object*/
function StatusDTO(params) {
    this.id = params.id;
    this.status = params.status;
}