var express = require('express');
var router = express.Router();
var StatusDAO = require('../models/statuses');

router.post('/ok-cancel-modal', function (req, res) {
    var context = req.body;
    res.render(getTemplate(req), context);
});

router.post('/new-task-modal', function (req, res) {
    var context = req.body;
    StatusDAO.findAll(function (err, statuses) {
        if (err) throw err;
        context.statuses = statuses;
        res.render(getTemplate(req), context);
    });
});

function getTemplate(req) {
    return req.originalUrl.slice(1);
}

module.exports = router;

