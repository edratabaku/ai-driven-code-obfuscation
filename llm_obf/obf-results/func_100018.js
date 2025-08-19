function b(a, c, d, e) {
    if (typeof a === "string") {
        var f = this.__map[a];
        if (!f) return this;

        a = f[0], c = f[1], d = f[2] || 1, e = f[3] || 1
    }

    this.__coord = this.__coord || [0, 0, 0, 0];

    this.__coord[0] =
        a * (this.__tile + this.__padding[0]) +
        (this.__padBorder ? this.__padding[0] : 0) +
        this.__trim[0];
    this.__coord[1] =
        c * (this.__tileh + this.__padding[1]) +
        (this.__padBorder ? this.__padding[1] : 0) +
        this.__trim[1];
    if (typeof d !== "undefined" && typeof e !== "undefined") {
        this.__coord[2] = this.__trim[2] || d * this.__tile || this.__tile;
        this.__coord[3] =
            this.__trim[3] || e * this.__tileh || this.__tileh
    }

    this.trigger("Invalidate");
    return this
}