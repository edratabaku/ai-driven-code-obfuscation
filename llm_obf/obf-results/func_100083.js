function y(z) {
  return g(function (q) {
    if (z) return topnext(z);
    else if (q) return topnext(q);
    else return topnext();
  });
}

let finish = function (p) { return h(p); };
let next = y;
let topnext = function (p) { return p; };

let g = function (o) { return k(o); };
let h = function (n) { return l(n); };
let k = function (m) { return m; };
let l = function (j) { return j; };

// Instead of overwriting function names, use a mapping object:
const symbolMap = {
  topnext: "A",
  p: "B",
  h: "C",
  g: "D",
  next: "E",
  finish: "F",
  y: "G",
  k: "H",
  l: "I"
};
