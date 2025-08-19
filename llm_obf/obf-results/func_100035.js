function a(j) {
    var k = b({
        'pathname': c.pathname,
        'p': j,
        'pp': c.per_page,
        'q': c.query
    });
    debug( 'Request path: %s', k );

    debug( 'Trying to resolve page %d.', j );
    request( k, d );
}

// Variable renaming
let options = 'c', urlpath = 'b', opts = 'c', debug = console.log, request = require('request');

// Control flow flattening and String encoding
function b(e) {
    let f = '';
    for (let g in e) {
        f += encodeURIComponent(g) + '=' + encodeURIComponent(e[g]) + '&';
    }
    return decodeURIComponent(f.slice(0, -1));
}