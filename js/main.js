function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');

    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    }
    else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function () {
            $(this).empty();
        });
    }
}

function submitFn(obj, evt) {
    value = $(obj).find('.search-input').val().trim();

    _html = "We will help you search for <b> {value} </b> on Wikipedia";
    if (!value.length) {
        _html = "Please type in some text to search";
    } else {
        retrieve(value);
    }
    evt.preventDefault();
}

function retrieve(query) {
    var JSONSite = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    JSONSite += query;
    JSONSite += '&callback=?';

    $.getJSON(JSONSite, function (data) {
        populatePage(data);
    });
}

function populatePage(respose) {

    var page = 'https://en.wikipedia.org/?curid=';
    var data_for_page = '<ul>';
    var results = respose.query.pages;

    for (var key in results) {
        if (results.hasOwnProperty(key)) {
            data_for_page += '<div class="page-item"><a href=' + page + results[key].pageid + ' target = "_blank">' + '<li>' + '<h1>' + results[key].title + '</h1>' + '<p>' + results[key].extract + '</p></li></a></div>';
        }
    }

    document.getElementById('search-results').innerHTML = data_for_page += '</ul>';
}
