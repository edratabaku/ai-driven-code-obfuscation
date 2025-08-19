function q() {
    var p = y;
    if (!p) return;
    var o = x;
    if (o) k.push(o.v.push(o.w));

    p.x = z(
        a.chain(k)
        .map(function(k) {
            return '* '+t(k).trim();
        })
        .value()
        .join('\n')
    );
    k = a.map(k, t);
    b.versions.push(p);

    o = "";
    p = null;
}