function searchToggle(obj, event) {
    var container = $(obj).closest('.search-wrapper');

    if (!container.hasClass('active')) {
        container.addClass('active');
        event.preventDefault();
    } else if (container.hasClass('active') && $(obj).closest('.input-holder').length === 0) {
        container.removeClass('active');

        //clear input
        container.find('.search-input').val('');
    }

}
