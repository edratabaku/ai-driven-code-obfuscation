function b(what) {
    var a = what;
    var c = {};
    if (typeof what == 'string') {
      // main
      var d = path.resolve(process.cwd(), what);
      require.cache[d] = undefined;
      a = require(d);
      // local
      var e = d.substring(0, d.lastIndexOf('.')) + '.local' + path.extname(d);
      if (fs.existsSync(e)) {
        require.cache[e] = undefined;
        c = require(e);
      }
    }
    // main and local merged
    return _.merge({},
      _.merge({}, a.default, a[this.env]),
      _.merge({}, c.default, c[this.env])
    );
}