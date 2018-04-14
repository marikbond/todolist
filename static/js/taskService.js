var TaskService = (function () {

    var baseUrl = '/tasks/';
    var taskApi = {
        create: {
            url: baseUrl,
            method: 'POST'
        },
        delete: {
            url: baseUrl,
            method: 'DELETE'
        }
    };

    return {
        create: function (task, callback) {
            var createApi = taskApi.create;
            $.ajax({
                method: createApi.method,
                url: createApi.url,
                data: task
            }).done(callback);
        },
        delete: function (id) {
            var deleteApi = taskApi.delete;
            $.ajax({
                method: deleteApi.method,
                url: deleteApi.url + id,
                statusCode: {
                    200: function () {
                        var $task = $('[data-task-id="' + id + '"]');
                        $task.remove();
                    },
                    503: function () {
                        console.error('ERROR');
                    }
                }
            })
        }
    }
})();