function c(r, a, v) {
    var b = this._container_resources_operands_map[a];
    if (b in r) {
        Firestorm.Array.excludeAll(r[b], v);
    }
}