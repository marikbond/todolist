$('#search-form').submit(function (event) {
    $.ajax({
        method: "GET",
        url: "search?query=" + this.query.value,
        context: $('#task-container')
    }).done(function(tasksHtml) {
        //TODO подменить URL на url c текущим запросом
        this.html(tasksHtml);
    });
    event.preventDefault();
});