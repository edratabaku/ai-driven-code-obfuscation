function a(c, d) {
  var b = wrapCompare(d, "b");
  var e = attachObserver(defaultSwap, "e");
  return sort(c, 0, c.length - 1, b, e);
}