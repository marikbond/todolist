var TaskService = (function () {

    var taskApi = {
        delete: "/delete-task/"
    };

    return {
        delete: function (id) {
            $.ajax({
                method: "GET",
                url: taskApi.delete + id,
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