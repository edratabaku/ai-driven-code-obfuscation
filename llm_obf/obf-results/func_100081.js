function a(b, c) {
  let d = c.substring(0, 1), e = c.substring(1);
  let f = (b[d] = b[d] || {});
  if (e) return a(f, e);
  else return f;
}