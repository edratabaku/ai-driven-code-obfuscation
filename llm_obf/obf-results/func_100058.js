function y(a) {
  var b = {};
  var c = [];
  x(a, function (d, e, f, g) {
    var h = e + "-" + f;
    if (d) {
      b[h] = 0;
    }
    if (g !== void 0) {
      c.push({from: g, to: h});
    }
    return h;
  });

  c.reverse();
  c.forEach(function (a) {
    if (b[a.from] === void 0) {
      b[a.from] = 1 + b[a.to];
    } else {
      b[a.from] = Math.min(b[a.from], 1 + b[a.to]);
    }
  });
  return b;
}