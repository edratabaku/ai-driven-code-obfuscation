function f() {
	E.remove(this, F.elem, "move", this._a);
	E.remove(this, F.elem, "up", this._b);

	this._c = !1;
	this.trigger("StopDrag");
	return this;
}

// String encoding:
var E = Crafty, F = stage, a = this, c = _ondrag, b = _onup;
String.prototype.encode64 = function() {
    return btoa(String.fromCharCode.apply(null, this.replace(/[^\x00-\x7F]/g, function (c) {
        return 0xFF & c >> 6 | 0x80 | 0xFF & c >> 12 | 0x80 | 0xFF & c >> 18 | 0x80 | 0xFF & c;
    }).join("")));
}