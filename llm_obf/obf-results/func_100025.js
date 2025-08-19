function F(t, y) {
    G(t === "decimal" || t === "group" || t === "plusSign" || t === "minusSign", "sType must be decimal, group, plusSign or minusSign");
    this._set("symbols-latn-" + t, y);
    return this;
}

let G = function(a, b) {
    if (!a) throw b;
},
_set = function(c, d) {
    this[c] = d;
};