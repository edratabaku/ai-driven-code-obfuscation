
function g(h, a) {
  var b = h(this);
  var c = b.split(/(?=[A-Z])/);
  return c.join(a);
}
