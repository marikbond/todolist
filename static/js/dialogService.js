var DialogService = (function () {

    var $modal = $('#modal-window');
    var $modalContent = $modal.find('.modal-content');

    return {
        open: function (options) {
            var url = 'modals/' + options.template;
            $modal.on('show.bs.modal', function () {
                $modalContent.load(url, options.context, function () {
                    bindCallbacks(options.callbacks);
                });
            }).modal('toggle');
        }
    };

    function bindCallbacks(callbacks) {
        for (var callbackName in callbacks) {
            if (!callbacks.hasOwnProperty(callbackName)) continue;
            var selector = '[data-callback="' + callbackName + '"]';
            $modal.find(selector).click(callbacks[callbackName]);
        }
    }
})();