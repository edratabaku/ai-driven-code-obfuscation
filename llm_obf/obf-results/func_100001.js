function y(a, b) {
    var c, d = a[0] || ".", e;

    if (z(d)) {
      throw new Error("require_directory argument must be a relative path");
    }

    c = p.resolve(p.dirname(b.pathname), d);
    e = b.stat(c);

    if (!e || !e.isDirectory()) {
      throw new Error("require_directory argument must be a directory");
    }

    a.context.dependOn(c);

    f.forEach(function (f) {
        var g = c + "/" + f;

        if (b.file === g) {
          return;
        } else if (a.context.isAssetRequirable(g)) {
          a.context.requireAsset(g);
        }
    }, b.entries(c));
  }

let p = require('path'), _ = require('lodash');
function isAbsolute(a) {
    return a[0] === '/';
}