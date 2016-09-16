/**
 * Created by cool.blue on 16-Sep-16.
 */
var os = require('os');

var EOL = (os.EOL);

[
  '%\x1B[34mdebug\x1B[39m: Starting C:\\Users\\Admin\\phantomjs-2.1.1-windows\\bin\\phantomjs.EXE C:\\Users\\Admin\\Documents\\GitHub\\phantomjs-node\\lib\\shim.js',
  '%\x1B[34mdebug\x1B[39m: -->phantom\t45ad2b\tcreatePage\t"params":[]',
  '%\x1B[34mdebug\x1B[39m: <--phantom\t45ad2b\tcreatePage\t"params":[],"response":{"pageId":"45ad2b"}',
  '%\x1B[34mdebug\x1B[39m: -->page$45\t7965fe\taddEvent\t"params":[{"type":"onConsoleMessage"}]',
  '%\x1B[34mdebug\x1B[39m: -->page$45\t1788cc\taddEvent\t"params":[{"type":"onInitialized","event":"\\r\\n\\tfunction () {\\r\\n        this.injectJs(\'./test-inject.js\');\\r\\n        console.log(\'^onInitialized\');  // logs out first as expected but script is not injected\\r\\n    }\\r\\n\\t","args":[]}]',
  '%\x1B[34mdebug\x1B[39m: <--page$45\t7965fe\taddEvent\t"params":[{"type":"onConsoleMessage"}]',
  '%\x1B[34mdebug\x1B[39m: <--page$45\t1788cc\taddEvent\t"params":[{"type":"onInitialized","args":[]}]',
  '%\x1B[34mdebug\x1B[39m: -->page$45\t1ede0a\tinvokeAsyncMethod\t"params":["open","./test-min.html"]',
  '%\x1B[34mdebug\x1B[39m: <--page$45\t<event>\tonInitialized\t"args":[]',
  '%\x1B[34mdebug\x1B[39m:',
  '@\x1B[32minfo\x1B[39m: <--injected code running...',
  '%\x1B[34mdebug\x1B[39m:',
  '@\x1B[32minfo\x1B[39m: <--div added',
  '@\x1B[32minfo\x1B[39m: ^onInitialized',
  '%\x1B[34mdebug\x1B[39m:',
  '@\x1B[32minfo\x1B[39m: <--page script tag is running...',
  '%\x1B[34mdebug\x1B[39m:',
  '@\x1B[32minfo\x1B[39m: <--INJECTED!!',
  '%\x1B[34mdebug\x1B[39m: <--page$45\t1ede0a\tinvokeAsyncMethod\t"params":["open","./test-min.html"],"response":"success"',
  '@\x1B[32minfo\x1B[39m: success',
  '%\x1B[34mdebug\x1B[39m: -->page$45\t0205de\tinvokeMethod\t"params":["evaluate","function () {checkInjection()}"]',
  '%\x1B[34mdebug\x1B[39m:',
  '@\x1B[32minfo\x1B[39m: <--INJECTED!!',
  '%\x1B[34mdebug\x1B[39m: <--page$45\t0205de\tinvokeMethod\t"params":["evaluate",null],"response":null',
  '@\x1B[32minfo\x1B[39m: page closed',
  '%\x1B[34mdebug\x1B[39m: -->page$45\t2e3258\tinvokeMethod\t"params":["close"]',
  '%\x1B[34mdebug\x1B[39m: <--page$45\t2e3258\tinvokeMethod\t"params":["close"]',
  '%\x1B[34mdebug\x1B[39m: -->phantom\t09a35d\tinvokeMethod\t"params":["exit"]',
  '%\x1B[34mdebug\x1B[39m: <--phantom\t09a35d\tinvokeMethod\t"params":["exit"]',
  '%\x1B[34mdebug\x1B[39m: Child exited with code {0}'
].forEach(line => {
    var stdOut = line.match(/@(.*)/);

    if(stdOut)
      process.stdout.write((line.substr(1)) + EOL);
    else
      process.stderr.write((line.substr(1)) + EOL);
  });
