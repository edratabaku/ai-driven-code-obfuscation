function f(a, b) {
  var c = !1;
  var d = '@type';
  if (!d in b) {
    var e = Object.keys(b).filter(function(f) {
      return f.indexOf('@') !== 0
    });
    if (e.length === 0) {
      c = !0
    } else if (a.constructor === Object && '@id' in a) {
      for (var g in e) {
        if (!(e[g] in a)) {
          c = !1;
          break
        }
      }
      c = !0
    }
  }
  return c
}