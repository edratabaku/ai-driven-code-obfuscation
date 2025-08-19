function b(_a, _b) {
    if (_b.z < _a.z) {
        return qfs.move(_b.y, _a.y)
            .then(function () {
                return new File(_a.y, _b.z);
            });
    }

    return _b.v()
        .then(function () {
            return _a;
        });
}