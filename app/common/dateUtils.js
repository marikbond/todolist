module.exports.format = function (date, format) {
    format = format || 'dd-mm-yyyy';
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;
    var result = format.replace('dd', day);
    result = result.replace('mm', month);
    result = result.replace('yyyy', year);
    return result;
};