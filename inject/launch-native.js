/**
 * failed attempt to hack phantomjs-node to launch the runner script
 * */
var phantom = require("../lib/index");
var _ph, _page, _outObj;

phantom.create(['native-injectJs.js', '--remote-debugger-port=9000']).then(ph => {

  _ph = ph;
  return 'done';

})
  .then(console.dir.bind(console))
  .catch(console.dir.bind(console));
