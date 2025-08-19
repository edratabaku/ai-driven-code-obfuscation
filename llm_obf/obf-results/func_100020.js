function r(c) {
    var e, t, n;
    for (e in c.fields) {
        t = c.fields[e].type || Lava.schema.data.DEFAULT_FIELD_TYPE;
        n = Lava.ClassManager.getConstructor(t, 'Lava.data.field');
        this._fields[e] = new n(this, e, c.fields[e], this._properties_by_guid)
    }
}