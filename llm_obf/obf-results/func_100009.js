function b(t, c) {
  var r = y.get(c), a = !r;
  y.set(c, function f() {
    invoke = a;
    z(t, f);
    invoke = !a;
    return resolve(arguments).then(bind.call(broadcast, c));
  });
  z(t, r);
}