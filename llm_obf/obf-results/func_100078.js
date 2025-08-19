function b(a, c, d, e) {
    var f = j();
    var g = j();

    var h = child_process.spawn(a, c, {
        stdio: [d || 'ignore', 'pipe', 'pipe']
    });
    h.stdout.pipe(f);
    h.stderr.pipe(g);
    h.on('exit', function(i, j) {
      var k;
      if (i) {
        k = new Error(i);
        k.code = i;
        k.signal = j;
      }
      e(k, f, g);
    });
    h.on('error', function (l) {
      e(l, f, g);
    });
}

function j() {
    return [];
}