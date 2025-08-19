function f(a, cb) {
    var b, c, d;

    if (!(a.arr && 1 < a.arr.length)) {
        cb('E array with at least 1 element is required', null);
    } else {
        b = a.arr;

        if (!a.h) {
            c = 'sha256';   // Set the default hash as SHA-256
        } else {
            c = a.h;
        }

        if (!a.hL) {
            d = !1;       // Assume the elements aren't hashes
        } else {
            d = a.hL;
        }

        // Import dependencies
        var e = require('./lib/hash-array');
        var g = require('./lib/merkle-gen');

        var ha = new e(c, d);

        ha.hEl(b, function (f) {
            // Generate a Merkle Tree from the leaves
            g(f, c, function (t) {
                cb(null, t);
            });
        });
    }
}