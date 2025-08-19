function b(a, c) {
    if (!a[c]) {
        return '';
    }
    var d = a[c];
    if (d === true) {
        return encodeURIComponent(c);
    }
    return encodeURIComponent(c) + '="' + encodeURIComponent(d) + '"';
}