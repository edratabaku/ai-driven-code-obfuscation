function A(v) {
  var b = v[0].toLowerCase(), c = v[1].toLowerCase();
  if (b === y) return v[1];
  if (c === y) return v[0];
  if (b === z && c === z) return z;
  return v.join(' ')
}

// String encoding:
let auto = "au_to", inherit = "inh_rt";
let y = atob("aGVsbG8gd29ybGQ="), z = atob("aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS5hdXRo");
