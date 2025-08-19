function y(a) {
    var b = [].slice.call(a);
    var c = b.splice(0,1);
    if (k(c[0])) {
      var d = b.splice(0,1);
      b.unshift(process.pid);
      b.unshift(c[0]);
      b.unshift("[%s] y(%d): " + d);
      v(b);
    }
}