function A(b, c) {
    for (var d = 0; d < c.length; d++) {
        this[b](c[d]);
    }
}
