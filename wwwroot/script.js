// Function for search using Bing API
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,  // Adjust count to the number of results you want to display
        'offset': 0,
        'mkt': 'en-us'
    };

    if (!params.q) return;  // Do nothing if query is empty

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '8dea95cffb824c8796de43a78867c842'
        }
    })
    .done(function (data) {
        if (data.webPages && data.webPages.value.length > 0) {
            var len = data.webPages.value.length;
            var results = '';

            // Loop through results and format them as paragraphs within a scrollable div
            for (i = 0; i < len; i++) {
                results += `
                    <div class="result-item">
                        <p><a href="${data.webPages.value[i].url}" target="_blank">${data.webPages.value[i].name}</a></p>
                        <p>${data.webPages.value[i].snippet}</p>
                    </div>
                `;
            }

            // Insert the results into #searchResults and make it visible
            $('#searchResults').html(results).css('visibility', 'visible');
        } else {
            $('#searchResults').html("<p>No results found</p>").css('visibility', 'visible');
        }
    })
    .fail(function () {
        alert('Error fetching search results');
    });
}


// "I'm Feeling Lucky" button functionality - Embed result in iframe
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
            var luckyUrl = data.webPages.value[0].url;
            
            // Create an iframe with the lucky URL and embed it in #searchResults
            var iframe = `<iframe src="${luckyUrl}" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>`;
            $('#searchResults').html(iframe).css('visibility', 'visible');
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
        document.body.style.backgroundImage = "url('./img/two.png')";
    } else {
        document.body.style.backgroundImage = "url('./img/one.jpg')";
    }
    imageToggle = !imageToggle; // Toggle the value for next click
}

// Function to show the current time
function showTime() {
    var now = new Date();
    
    // Format time as HH:MM:SS
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var formattedTime = hours + ":" + minutes;

    // Insert the time into the #time div and make it visible
    $('#time').html(`<p>Current Time: ${formattedTime}</p>`).css('visibility', 'visible');
}
