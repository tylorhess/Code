var page = require('webpage').create(),
    system = require('system');

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// Open http://www.homelessshelterdirectory.org/cgi-bin/id/opensearch.cgi?city=Boston&state=MA
page.open(encodeURI("http://www.homelessshelterdirectory.org/cgi-bin/id/opensearch.cgi?city=Boston&state=MA"), function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        // Execute some DOM inspection within the page context
        page.evaluate(function() {
            var list = document.querySelectorAll('a.marker span.tabT');
            for (var i = 0; i < list.length; ++i) {
                console.log((i + 1) + ": " + list[i].innerText);
            }
        });
    }
    phantom.exit();
});