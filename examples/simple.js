var phantom = require("../lib");
var _ph, _page, _outObj;

phantom.create().then(ph => {
    _ph = ph;
    return _ph.createPage();
}).then(page => {
    _page = page;
    return _page.open('../fixtures/testSimple.html');
}).then(status => {
    console.log(status);
    return _page.property('content')
}).then(content => {
    console.log(content);
    _page.close();
    _ph.exit();
}).catch(e => console.log(e));
