var express = require('express');
var router = express.Router();
var async = require('async');
var StatusDAO = require('../models/statuses');
var TaskDAO = require('../models/tasks');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function (req, res) {
    async.parallel({
        tasks: TaskDAO.findAll,
        statuses: StatusDAO.findAll
    }, function(err, results) {
        if (err) {
            throw new Error('Exception when render index page');
        }
        res.render('index', results);
    });
});

router.post('/', function (req, res) {
    TaskDAO.save(req.body, function (err, task) {
        if (err) throw err;
        res.render('partials/task', {task: task});
    });
});

router.delete('/:id', function (req, res) {
    TaskDAO.delete(req.params.id, function (error) {
        res.sendStatus(error ? 503 : 200);
    });
});

router.get('/search', function (req, res) {
    TaskDAO.find(req.query.query, function (err, tasks) {
        if (err) return;
        res.render('partials/tasks', {tasks: tasks})
    });
});

module.exports = router;