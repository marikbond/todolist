$('#search-form').submit(function (event) {
    $.ajax({
        method: "GET",
        url: "search?query=" + this.query.value,
        context: $('#task-container')
    }).done(function(tasksHtml) {
        console.log(tasksHtml);
        this.html(tasksHtml);
    });
    event.preventDefault();
});

$('#save-task-button').click(function (event) {
    $.ajax({
        method: "POST",
        url: "/add-task",
        data: extractTask()
    }).done(function() {
        //TODO Add new task to view
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