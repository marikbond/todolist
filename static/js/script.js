var $task = $('#task-container');

$('#search-form').submit(function (event) {
    $.ajax({
        method: "GET",
        url: "search?query=" + this.query.value
    }).done(function (tasksHtml) {
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
    }).done(function (taskHtml) {
        console.log(taskHtml);
        $task.append(taskHtml);
        resetModalForm();
    });
});

$("#modal-question").click(function () {
    var $relatedTarget = $(this);
    $('#modal-window')
        .on('show.bs.modal', function () {
            //Тут можно сделать запрос к серверу и скачать шаблон c помощь jQuery.load
            var $template = $($('#modal-question-template').html());
            var $title = $template.find('h3.modal-title');
            $title.html($relatedTarget.data('title'));
            $('.modal-content').html($template.html());
        })
        .modal('toggle')
});

$('.delete-task-btn').click(function () {
    var $listItem = $(this);
    var $task = $listItem.closest('.task');
    $('#delete-task-modal')
        .modal('toggle')
        .on('show.bs.modal')
        .on('');
    console.log(result);
    $('#yes-delete').click(function () {
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
    $('#no-delete').click(function () {
        $('#delete-task-modal').modal("hide");
        return false;
    });
});

// function deleteProovement() {
//     // $('#delete-task-modal').modal('toggle');
//
//     $(function() {
//         $('#yes-delete').click(function() {
//             return true;
//         });
//         $('#no-delete').click(function() {
//             return false;
//         });
//     });
// }

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