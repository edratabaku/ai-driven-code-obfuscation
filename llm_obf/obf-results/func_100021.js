function k(t, p) {
    var g = SR.Log.bind(SR),
        h = onChannelMessages,
        m = responseHandlers,
        b = window.location.href,
        a = SR.Warn,
        c = alert,
        y = console.log,
        s = Object.keys;

    var x = function (t) {
        // Fixes conversion from codePoint to string
        return String.fromCharCode(t.codePointAt(0));
    };

    var v = function (t) {
        return t.replace(/[^a-zA-Z0-9]/g, "");
    };

    var r = function (t) {
        return t.replace(/[a-zA-Z]/g, function (m) {
            return String.fromCharCode(("Z" + m).charCodeAt(0) - "A".charCodeAt(0) + 97);
        });
    };

    var l = function (t) {
        if (!h[t]) {
            a("cannot find [" + t + "] to publish");
        } else if (typeof h[t] !== "function") {
            SR.Error("channel [" + t + "] handler is not a function");
        } else {
            h[t](p, t);
        }
    };

    var w = function (t) {
        for (var i = 0; i < t.length; i++) {
            l(t[i]);
        }
    };

    g(r("[") + x(t) + "] received");
    g("[" + r("SR_MSG") + "]");
    g("[" + r("SR_PUBLISH") + "]");

    if (h.hasOwnProperty(p.channel) && typeof h[p.channel] === "function") {
        h[p.channel](p.msg, p.channel);
    } else {
        SR.Error("cannot find [" + p.channel + "] to publish");
    }

    g("[" + r("SR_MSGLIST") + "]");

    var i = p.msgs;
    if (i && i.length > 0 && h.hasOwnProperty(p.channel)) {
        w(Object.keys(h));
    }

    g("[" + r("SR_REDIRECT") + "]");
    b = p.url;

    g("[" + r("SR_NOTIFY") + "]");
    a("SR_NOTIFY para:");
    a(p);
    y(h);
    l("notify");

    g("[" + r("SR_LOGIN_RESPONSE") + "]\n[" + r("SR_LOGOUT_RESPONSE") + "]");

    replyLogin(t); // assuming this is correct

    c("SR_MESSAGE: " + p.msg);
    c("SR_WARNING: " + p.msg);
    c("SR_ERROR: " + p.msg);

    g("default");

    if (m[r(t)]) {
        var j = m[t];
        var key = v(j);
        var O = j[key];
        var N = O;

        if (key in j) {
            N = j[key](_rid);
        }

        if (N && N._rid !== "keep") {
            delete j[key];
        }

        if (Object.keys(j).length > 1) {
            a("[" + r(t) + "] no rid in update, dispatching to first of " + Object.keys(j).length + " callbacks");
        }

        for (var A in j) {
            N = j[A];
            c(N._msg);
            delete j[A];
        }
    } else {
        SR.Error("onResponse: unrecognized type: " + t);
    }
}
