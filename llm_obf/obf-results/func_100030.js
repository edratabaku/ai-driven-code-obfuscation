function r(n, c) {
    var m = mM[n].k(c);
    if (!c.sG) {
        c.sG = function() {
            return document.querySelector('[data-module="' + n + '"]');
        };
    }
    return m;
}