/**
 * Created by cool.blue on 16-Sep-16.
 */
var fs = require('fs'),
    os = require('os'),
    _unescape = require('unescape-js'),
    intercept = require("intercept-stdout"),
    inFile = "./log-stdout.txt",
    inStream = fs.createReadStream(inFile);

function unescape (s) {
  var eof = '<<CR>><<LF>>';
  var findEof = /\\\\/g;
  var replcEof = '\\r\\n';
  return _unescape(s.replace(findEof, '\\'))/*.replace(new RegExp(eof, 'g'), replcEof)*/
}
inStream.pipe(process.stdout);
var lines = [];
var EOL = (os.EOL);
var unHook = intercept(function(buff) {
  var _txt = unescape(buff.toString());
  lines = lines.concat(_txt.split(EOL));
});

inStream.on('end', _ => {
  unHook();

  lines.forEach(line => {
    var stdOut = line.match(/@(.*)/);

    if(stdOut)
      process.stdout.write((line.substr(1)) + EOL);
    else
      process.stderr.write((line.substr(1)) + EOL);
  });
})