/**
 * phantomjs-node script to launch the page and inject the script
 * */
var phantom = require("../lib/index");
var _ph, _page, _outObj;

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


// phantom.create(['--remote-debugger-port=9000'], {logLevel: 'debug'}).then(ph => {
  phantom.create([]).then(ph => {

    _ph = ph;
    return _ph.createPage();

}).then(page => {

  _page = page;
  var inject = (page, src) => {
        return page.on('onInitialized', (function() {
          var initialised;
          return function() {
            if(!initialised) {
              page.injectJs(src)
                .then(_ => console.log('...injectJs ' + src));
              initialised = true;
            }
          }
        })())
          .then(_ => console.log('...onInitialized'))
      },
      log    = _ => {
        return page.on('onConsoleMessage', function(message) {
          process.stdout.write('-> ' + message + '\n')
        })
      },
      open   = (page, url) => {
        return _ => page.open(url)
          .then(_ => url + '\t' + _)
      };

  return Promise.all(
    [ log(),
      inject(page, './test-inject.js')
    ]).then(open(page, './testSimple.html'))

}).then(console.log.bind(console))
  .then(() => {
    return _page.evaluate(function() {checkInjection()})
      .then(_ => {
        return _page.close();
      })
      .then(_ => {
        console.log('page closed');
        return _ph.exit();
      })
  }).catch(console.dir.bind(console))
