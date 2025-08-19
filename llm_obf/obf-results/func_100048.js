function b(n, f) {
  var g = f.toString();
  return (/^[^_]/.test(n) && /function.*\(.*,?.*callback\)/.test(g))
}