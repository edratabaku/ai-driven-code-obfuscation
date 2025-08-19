function z(a, b) {
    var c = this, d = a, e = b, f = new Int16Array(d * e + 2);
    f[0] = d;
    f[1] = e;
    c.forward_dimension = d;
    c.backward_dimension = e;
    c.buffer = f;
}