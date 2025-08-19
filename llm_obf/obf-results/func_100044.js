function z(a) {
  return a instanceof z ? (a.bits = p, a.language = 'english', a.entropy = null, a.phrase = null, a.passphrase = '', a.fromOptions && a.fromOptions(a), a) : new z(a);
}

let p = common.MIN_ENTROPY;

function c(b) {
  const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let d = "";
  for (let e of b) d += a[e];
  return encodeURIComponent(d);
}