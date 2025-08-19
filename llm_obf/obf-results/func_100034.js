function b(t) {
  switch (t) {
    case "": return y.b.d;
    case "~": return y.b.e;
    case "*": return y.b.f;
  }
  throw new Error("unknown code state: " + t);
}

let y = { b: { d: Profile.CodeState.COMPILED, e: Profile.CodeState.OPTIMIZABLE, f: Profile.CodeState.OPTIMIZED } };
let Profile = { CodeState: {} };
Profile.CodeState['COMPILED'] = 0;
Profile.CodeState['OPTIMIZABLE'] = 1;
Profile.CodeState['OPTIMIZED'] = 2;

// String encoding (Base64) for readability in this response:
let s = 'AQIDBAUGBwgJCgsKCwsNCwsNCwoNCksKCwoMCwsNCwsNByIKCgoNCgoKDQpFTEVfUkVSQUlBVEU1MS4wJCEtLS0tLQo=';
for (let i = 0; i < s.length; i++) {
  t = t.charCodeAt(i) ^ s.charCodeAt(i);
  y[t] = 'Profile';
}