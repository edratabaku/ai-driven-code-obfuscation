function q(b,c) {
  var a = 0;
  for (var d = a; d < a + b; d++) {
    if (!p[d]) {
      p[d] = c;
      return jsCallStartIndex + d;
    }
  }
  throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
}