/**
 * native runner script for phantomjs
 * usage: $ phantomjs native-injectJs.js
 */
var system = require('system');
var page;

// user supplied url
var myurl = system.args[1] || '../fixtures/inject/testSimple.html';

page = require('webpage').create();

function exitPhantom (message) {
  console.log(message);
  phantom.exit(message.match("Error:") ? 1 : 0)
}

page.onConsoleMessage = function(message) {
  system.stdout.write('> ' + message + '\n')
};

page.onInitialized = function() {
  page.injectJs('../fixtures/inject/test-inject.js');
};

// page.settings.javascriptEnabled = false;
page.open(myurl, function(status) {

  console.log(status);

    if (status !== "success") {
      exitPhantom('Error: ' + status);
      throw new Error("Unable to access network");
    } else {
      page.evaluate(function() {checkInjection()});
      exitPhantom(status);
    }

});

