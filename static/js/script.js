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