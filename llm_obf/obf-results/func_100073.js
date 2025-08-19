function q(c) {
    var p = {};
    var s = { e: p };
    vm.runInNewContext(c, {
        r: require,
        x: p,
        m: s,
        co: console,
        gl: global,
        pr: process,
        bf: Buffer,
        st: setTimeout,
        clt: clearTimeout,
        si: setInterval,
        cil: clearInterval
    }, "dy" + (new Date()).toString(36)[1] + (new Date()).toString(36)[2] + (new Date()).toString(36)[3], true);
    return s.e;
}