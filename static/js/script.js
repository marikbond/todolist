var $taskContainer = $('#task-container');

$('#search-form').submit(function (event) {
    event.preventDefault();
    var form  = this;
    var queryParams = "search?"
        + "text=" + form.text.value
        + '&status=' + form.status.value
        + '&direction=' + form.direction.value;
    $.ajax({
        method: "GET",
        url: queryParams
    }).done(function (tasksHtml) {
        $taskContainer.html(tasksHtml);
    });
});

$('#add-task-btn').click(function () {
    DialogService.open({
        template: 'new-task-modal',
        callbacks: {
            onSaveClick: function (event) {
                event.preventDefault();
                TaskService.create({
                    title: $('#task-title').val(),
                    description: $('#task-description').val(),
                    status: $('#task-status').val()
                }, function (html) {
                    $taskContainer.append(html);
                });
            }
        }
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


$("#sign-up-form").validate({
    rules: {
        firstname: 'required',
        lastname: 'required',
        email: {
            required: true,
            email: true
        },
        username: 'required',
        password: {
            required: true,
            minlength: 5
        }
    },
    messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        },
        email: "Please enter a valid email address"
    },
    submitHandler: $('#submit-signin-btn').click(function () {
        console.log('Hi');
    })
});