function b(c, d) {
    if (c) {
        this.q = c;
        this.r = d;
    } else {
        var e = YAHOO.util.Dom.getXY(this.getEl());
        this.q = e[0];
        this.r = e[1];
    }
}