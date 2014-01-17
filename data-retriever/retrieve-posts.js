// Load modules
var http = require('http');
var fs = require('fs');

/**
 *  This function infinitely retries the configured endpoint if the HTTP status code from the server is not 200
 *
 * @ options An object containing the http endpoint host and url path
 * @ callback A callback function for automatic, infinite, retries
 */
function retrievePosts(options, callback) {
    // Call the API endpoint
    var req = http.request(options, function (res) {

        // Get the response body
        var body = "";
        res.on("data", function (payload) {
            body += payload.toString("utf-8");
        });

        // At end of HTTP call. Check the status code.
        res.on("end", function () {

            //log what happened
            console.log(req.method + ' ' + options.path + ' ' + res.statusCode);
            if (res.statusCode === 200) {
                // Got a 200 return the response body
                callback(null, body);
            } else {
                // Did not get a 200 try again
                retrievePosts(options, callback);
            }
        });
    });
    req.end();

    // Process the error coming from req
    req.on('error', function (error) {
        console.log('Oh Snap! An error occurred trying to call ' + options.host + options.path + ': ' + error);
        retrievePosts(options, callback);
    });
}

// API endpoint configuration
var options = {
    host: 'rack1.citizennet.com',
    path: '/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6'
};

// Call the endpoint
retrievePosts(options, function (error, response) {
    if (error) {
        console.log('Oh Snap! An error occurred trying to call ' + options.host + options.path + ': ' + error);
        throw error;
    }
    // Write the endpoint data to a the cache
    fs.writeFile('../cache/posts.json', response, function (error) {
        if (error) {
            console.log('Oh Snap! An error occurred trying to write to disk: ' + error);
            throw error;
        }
        console.log('Posts written to cache.');
    });
});