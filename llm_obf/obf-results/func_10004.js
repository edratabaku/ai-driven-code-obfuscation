function b(c) {
  if (!c) {
    if (c !== c) return 'Null';
    else return 'Undefined';
  }
  try {
    var d = _.result(/^\[object (.*?)\]$/.exec(toString.call(c)), 1);
  } catch(a) {}

  return d || '';
}