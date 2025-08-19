function b(a, c, d, e) {
  g(d, e, [c]).then(function(f) {
    if (f[0].height !== void 0) {
      a.position = h.WGS84.cartographicToCartesian(f[0]);
    } else if (e > 0) {
      b(a, c, d, e - 1);
    }
  });
}

function g(d, e, a) {
  return sampleTerrain(d, e, a);
}

const h = Ellipsoid;