/**
 * native runner script for phantomjs
 * usage: $ phantomjs onInitialized.js
 */
var system = require('system');
var page, x = 0;

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
  console.log('EXITING ' + system.args[0] + ': ' + message + '\n' + trace());
  phantom.exit(message.match("Error:") ? 1 : 0)
}

page.onConsoleMessage = function(message) {
  system.stdout.write('> ' + message + '\n')
};

page.onInitialized = function() {
  console.log('^onInitialized fired ' + x+++ '\n' + trace());
};

page.open('http://google.com', function(status) {

  console.log('^page.open fired: ' + status+ '\n' + trace());
  exitPhantom('');

});

