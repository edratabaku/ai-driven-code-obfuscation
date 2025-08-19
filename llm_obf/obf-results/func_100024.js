function kk(st, x) {
  var y = st.length;
  if (y <= 150) return st;
  if (x > y) x = y;

  var z = Math.max(x - 60, 0);
  if (z < 5) z = 0;

  var a = Math.min(z + 140, y);
  if (a > y - 5) a = y;
  if (a === y) z = Math.max(a - 140, 0);

  st = st.slice(z, a);
  if (z > 0) st = '{snip} ' + st;
  if (a < y) st += ' {snip}';

  return st;
}