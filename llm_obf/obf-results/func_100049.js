function A(B, C) {
    var D = createSpan();
    D.style.fontFamily = encodeURIComponent("'" + B + "'") + "," + C;
    return D
}