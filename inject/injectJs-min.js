/**
 * run from node
 * */
var phantom = require("../lib/index");
var _ph;

  phantom.create([], {logLevel: 'debug'}).then(ph => {

    _ph = ph;
    return _ph.createPage();

}).then(page => {
    page.on('onConsoleMessage', function(message) {
      process.stdout.write('-> ' + message + '\n')
    });
    page.on('onInitialized', function() {
      page.injectJs('./test-inject.js');
      console.log('^onInitialized');  // logs out first as expected but script is not injected
    })
      .then(_ => page.open('./test-min.html'))  // page script tags run
      .then(console.dir.bind(console))  // success
      .then(_ => page.evaluate(function() {checkInjection()}))  // not injected
      .then(_ => {
        console.log('page closed');
          return page.close()
            .then(_ => _ph.exit().then(_ => console.log('exiting... ' + _)))
        })
      }).catch(console.dir.bind(console));

