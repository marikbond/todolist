var $task = $('#task-container');

$('#search-form').submit(function (event) {
    $.ajax({
        method: "GET",
        url: "search?query=" + this.query.value
    }).done(function(tasksHtml) {
        $task.html(tasksHtml);
    });
    event.preventDefault();
});

$('#save-task-btn').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: "POST",
        url: "/add-task",
        data: extractTask()
    }).done(function(taskHtml) {
        $task.append(taskHtml);
        resetModalForm();
    });
});

$('.delete-task-btn').click(function (event) {
    event.preventDefault();
    var $listItem = $(this);
    var $task = $listItem.closest('.task');
    $.ajax({
        method: "GET",
        url: "/delete-task/" + $task.data('taskId'),
        statusCode: {
            200: function () {
                $task.remove();
            },
            503: function () {
                console.log('ERROR');
            }
        }
    })
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