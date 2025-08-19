function e() {
	var t = this.context.gl;
	this.gl = t;
	t = this.gl;
	this[b] = t[a]();
	var a = "createBuffer";
	var b = "vertexBuffer";
	var c = this.numIndices > 0 ? (c = t, c["createBuffer"])() : null;
	var d = "indexBuffer";
	this.dirty = !0;
}