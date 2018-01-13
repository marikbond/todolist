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
    $.ajax({
        method: "POST",
        url: "/add-task",
        data: extractTask()
    }).done(function(taskHtml) {
        $task.append(taskHtml);
        resetModalForm();
    });
    event.preventDefault();
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