function f(a) {
  var c = this, b = ["z", "y", "x", "w"];
  Parse.each(b, function(d) {
    if (a[d]) {
      if (d === "y") {
        c.z = a[d];
      } else if ((d === "x" || d === "w") && !_.iD(a[d])) {
        c[d] = Parse._pD(a[d]);
      } else {
        c[d] = a[d];
      }
      delete a[d];
    }
  });
}