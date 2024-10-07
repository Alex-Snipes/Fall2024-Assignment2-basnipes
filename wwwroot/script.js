// Function for search using Bing API
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '8dea95cffb824c8796de43a78867c842'
        }
    })
    .done(function (data) {
        var len = data.webPages.value.length;
        var results = '';
        for (i = 0; i < len; i++) {
            results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
        }

        $('#searchResults').html(results);
        $('#searchResults').dialog();
    })
    .fail(function () {
        alert('Error fetching search results');
    });
}

// "I'm Feeling Lucky" button functionality
function feelingLucky() {
    var params = {
        'q': $('#query').val(),
        'count': 1,  // Only need the first result
        'offset': 0,
        'mkt': 'en-us'
    };

    if (!params.q) return;  // No query, do nothing

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '8dea95cffb824c8796de43a78867c842'
        }
    })
    .done(function (data) {
        if (data.webPages && data.webPages.value.length > 0) {
            // Redirect to the first result's URL
            window.location.href = data.webPages.value[0].url;
        } else {
            alert("No results found");
        }
    })
    .fail(function () {
        alert('Error fetching search results');
    });
}

// Toggle background image between two images
let imageToggle = false;

function changeBackground() {
    if (imageToggle) {
        document.body.style.backgroundImage = "url('/img/joanna-kosinska-PbgY3ptgA4A-unsplash.jpg')";
    } else {
        document.body.style.backgroundImage = "url('/img/joshua-earle-XnDQ9uXILRE-unsplash.jpg')";
    }
    imageToggle = !imageToggle; // Toggle the value for next click
}