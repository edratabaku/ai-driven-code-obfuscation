function b(a) {
    var c, d;
    a = String(a);
    d = this.xmldom ? this.xmldom.createTextNode(a) : document.createTextNode(a);
    return c = d;
}