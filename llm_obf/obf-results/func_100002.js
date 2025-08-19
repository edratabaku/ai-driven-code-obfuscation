function a(b, c) {
    if (typeof b[c] !== 'function') {
        var d = b[c];
        b[c] = function(e) { return e[d]; };
    }
}