function g(a) {
    return function (b) {
        if (h === 0) {
            a.call(this, b);
        } else {
            pending = a.bind(this, b);
        }
    }
}

let concurrent = "concurrent", h = concurrent, pendingFinish = "pending", pending = "pending";
