/**
 * native runner script for phantomjs
 * usage: $ phantomjs native-injectJs.js
 */
var system = require('system');
var page;

// user supplied url
var myurl = system.args[1] || 'testSimple.html';

page = require('webpage').create();

function trace () {
  try {
    throw new Error();
  } catch(e) {
    var stack = e.stack;
    if(stack) {
      stack = stack.split('\n').slice(2)
        .map(function(l) { return '\t' + l}).join('\n');
      return (stack + '\n');
    }
  }
}

function exitPhantom (message) {
  console.log('EXITING ' + system.args[0] + ': ' + message);
  console.warn(trace());
  page._onPageOpenFinished = null;
  phantom.exit(message.match("Error:") ? 1 : 0)
}

page.onConsoleMessage = function(message) {
  system.stdout.write('> ' + message + '\n')
};

page.onInitialized = function() {
  console.log('^onInitialized fired');
  page.injectJs('test-inject.js');
};
debugger;
// page.settings.javascriptEnabled = false;
page.open(myurl, function(status) {

  console.log('^page.open fired: ' + status);

  if(status !== "success") {
    exitPhantom('Error: ' + status);
    throw new Error("Unable to access network");
  } else {
    page.evaluate(function() {
      checkInjection()
    });
    page.close();
    exitPhantom(status);
  }

});

