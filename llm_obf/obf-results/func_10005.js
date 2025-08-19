function b(a) {
  const c = Array.isArray(a) ? a : [a];
  const d = c.map(normalizeSpec);
  return d;
}

function normalizeSpec(e) {
  // For simplicity, I'm only encoding "specs" in this example
  const encodedSpecs = encodeString(e.specs);
  // You can use a more sophisticated method for encoding other variables if needed

  return { encodedSpecs };
}

function encodeString(str) {
  // A simple base64-like string encoding function
  const lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const encoded = [];

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0xFF) {
      encoded.push(lookup[charCode >> 2]);
      encoded.push(lookup[((charCode & 0x3) << 4) | ((str.charCodeAt(++i) & 0xF0) >> 4)]);
      if (i < str.length - 1) {
        encoded.push(lookup[(str.charCodeAt(i + 1) & 0xCF) >> 2] | lookup[((str.charCodeAt(++i) & 0x3F) << 4)]);
      } else {
        encoded.push(lookup[(charCode & 0x3F)]);
        encoded.push('==');
      }
    }
  }

  return encoded.join('');
}