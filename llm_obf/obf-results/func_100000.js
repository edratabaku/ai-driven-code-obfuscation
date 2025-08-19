function b(n) {
    let c = n.loc.start,
        d = n.loc.end;

    f = f.filter(({ loc: a }) => {
        if (a.line >= c.line && a.line <= d.line) {
            if (a.column >= c.column && (a.column <= c.column + (d.column - c.column) || a.line < d.line)) {
                return !1;
            }
        }
        return !0;
    });
}