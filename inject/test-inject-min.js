/**
 * script to be injected onInitialzed.
 */
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

console.log('injected code running...\n' + trace());
var injected = document.createElement('div');
injected.id = 'injected';
injected.setAttribute('style', 'background-color: beige; top: 100px; left: 100px; font-size: x-large;');

injected.textContent = 'INJECTED!!';
function inject(){

  if(document.body) {
    document.body.appendChild(injected);
    console.log('div added\n' + trace());
  }  else
    console.log('document.body is falsey, cannot add node!!');
}
inject();
