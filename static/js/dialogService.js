var DialogService = (function () {

    function obj() {
        
    }
    
    return {
        open: function (options) {
            
        }
    }
})();


DialogService.open({
    title: 'Are you sure?',
    onConfirm: function () {
        console.log('Confirmed');
    },
    onReject: function () {
        console.log('Rejected');
    }
});