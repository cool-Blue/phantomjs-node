/**
 * test-inject.js
 * script to be injected onInitialzed.
 */

console.log('injected code running...');
var injected = document.createElement('div');
injected.id = 'injected';
injected.setAttribute('style', 'background-color: beige; top: 100px; left: 100px; font-size: x-large;');

injected.textContent = 'INJECTED!!';
function inject(){

  if(document.body) {
    document.body.appendChild(injected);
    console.log('div added');
  }  else
    console.log('document.body is falsey, cannot add node!!');
}
inject();
