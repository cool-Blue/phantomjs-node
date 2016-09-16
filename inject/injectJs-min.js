/**
 * run from node
 * */

var phantom = require("../lib/index");
const winston = require('winston');
var log;
var _ph;

var _jsesc = require('jsesc');
function jsesc () {
  return _jsesc.apply(this, arguments)
    // .replace(/\\\\r/g, '\r')
    // .replace(/\\\\n/g, '\n')
    // .replace(/\\\\t/g, '\t')
}
var fs = require('fs'),
    intercept = require("tapit"),
    outFile = "./log-stdout.txt",
    _stream = fs.createWriteStream(outFile);

var unTapStdout = intercept(process.stdout, function(txt) {
  _stream.write('@' + jsesc(txt));
  // _stream.write('@' + txt);
});
var unTapStderr = intercept(process.stderr, function(txt) {
  _stream.write('%' + jsesc(txt));
  // _stream.write('%' + txt);
});

  phantom.create([], {logLevel: 'debug'}).then(ph => {

    _ph = ph;

    ph.logger.filters.push((level, msg) => {
      var dirn = msg.match(/^(\w+?):/);
      try {
        var json = JSON.parse(msg.replace(/^(\w+?):/,""));
        var target = json.target.match(/page.{3}/) || json.target;
        var _msg = dirn[1] === 'Sending' ? '-->' + target : '<--' + target;
        delete json.target;
        var id;
        if(typeof json.id === 'undefined') {
          if(json.type === 'onConsoleMessage')
            return '';
          id = '<event>';
          json.name = json.type;
          delete json.type;
        } else {
          id = json.id.substr(0, 6);
          if(json.params && json.params.length && json.params[0].event) {
            json.params[0].event = '\r\n\t' + json.params[0].event + '\r\n\t';
          }
        }
        delete json.id;
        if (json.response && json.response.pageId) {
          json.response.pageId = json.response.pageId.substr(0, 6);
        }
        var name = json.name; delete json.name;
        _msg += `\t${id}\t${name}\t${JSON.stringify(json).replace(/^\{(.+?)\}$/, '$1')}`;
        return _msg
      } catch (e) {
        if (e.message.indexOf('Unexpected') === 0)
          return msg;
        else
          throw(e);
      }
    });

    winston.loggers.add( 'inject', {
      console: {
        name: 'inject',
        level: 'info',
        colorize: true,
        prettyPrint: true
      }
    });
    log = winston.loggers.get('inject');
    var _info = log.info;
    log.info = function() {
      var strm = process.stderr;
      var writing = strm._writableState.writing
        || strm._writableState.bufferProcessing
        || strm.bufferSize;
      if(writing)
        process.stderr.once('drain', _info.apply(log, arguments));
      else
        _info.apply(log, arguments);
    };

    return _ph.createPage();

}).then(page => {
  var initRes;
  var pInit = new Promise((res, rej) => {
    initRes = res;
  });
    page.on('onConsoleMessage', function (message) {
      log.info('<--' + message)
    });
    page.on('onInitialized', true, function() {
      console.log('^onInitialized');  // logs out first as expected but script is not injected
      this.injectJs('./test-inject.js');
    })
      .then(_ => initRes()) // just an experiment for deferred promise
      .then(_ => pInit)
      .then(_ => page.open('./test-min.html'))  // page script tags run
      .then(log.info.bind(log))  // success
      .then(_ => page.evaluate(function() {checkInjection()}))  // not injected
      .then(_ => {
        log.info('page closed');
          return page.close()
            .then(_ => _ph.exit().then(_ => log.info('exiting... ' + _)))
        })
      }).catch(console.dir.bind(console));

