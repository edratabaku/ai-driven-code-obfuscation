function f(t, sD, cN) {
  var m = t.match(/enum (.*)$/);
  var eD = g(m[1], sD, cN);
  if (eD === null) {
    console.log('unable to retrieve decode info of ' + t);
    return null;
  }
  return new EnumType(eD);
}

function g(n, sD, cN) {
  // ... your getEnum implementation here ...
}