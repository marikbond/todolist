$('#search-form').submit(function (event) {
    console.log(this.query.value);
    event.preventDefault();
});