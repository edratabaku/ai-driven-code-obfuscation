function z(u, c) {
    var b = {
        url: u,
        method: 'GET',
        headers: {
            a: 'http://psapp.dl.playstation.net',
            b: ['Origin', 'Accept-Language', 'Authorization', 'Content-Type', 'Cache-Control'],
            c: 'Bearer ' + x, // assuming `x` is defined globally (token)
            d: 'no-cache',
            e: 'X-Requested-With',
            f: y,            // assuming `y` is defined globally
            g: 'User-Agent'
        }
    };

    request.get(b, function (e, s, t) {
        if (e) {
            // Request error
            return c(true, e);
        }

        var a;
        try {
            a = JSON.parse(t);
        } catch (err) {
            return c(true, new Error("Failed to parse JSON response"));
        }

        if (s.statusCode === 200) {
            return c(false, a);
        }

        if (s.statusCode === 401 && a.error && (a.error.code === 2105858 || a.error.code === 2138626)) {
            debug('Token has expired, asking for new one');
            initLogin(function () {
                z(u, c); // Retry after re-login
            });
        } else {
            return c(true, a);
        }
    });
}
