var $taskContainer = $('#task-container');

$('#search-form').submit(function (event) {
    //TODO перенести функционал поиска в TaskService метод search
    $.ajax({
        method: "GET",
        url: "search?query=" + this.query.value
    }).done(function (tasksHtml) {
        $taskContainer.html(tasksHtml);
    });
    event.preventDefault();
});

$('#save-task-btn').click(function (event) {
    event.preventDefault();
    TaskService.create(extractTask(), function (taskHtml) {
        var $taskContainer = $('#task-container');
        $taskContainer.append(taskHtml);
        resetModalForm();
    });
});

$('.delete-task-btn').click(function () {
    var $listItem = $(this);
    DialogService.open({
        template: 'ok-cancel-modal',
        context: {
            title: 'Question',
            text: 'Are you sure?'
        },
        callbacks: {
            onOkClick: function () {
                var $task = $listItem.closest('.task');
                TaskService.delete($task.data('taskId'));
            }
        }
    });
});

function extractTask() {
    return {
        title: $('#task-title').val(),
        description: $('#task-description').val(),
        status: $('#task-status').val()
    }
}

function resetModalForm() {
    $('#task-title').val('');
    $('#task-description').val();
    $('#task-status').val(4);
}