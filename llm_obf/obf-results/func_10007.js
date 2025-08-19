function k(a) {
    /*eslint max-statements:0*/
    "use strict";
    var b = require('webpage').create();
    b.isP = false;

    function c(d) {
        if (d.isP) {
            if (a.page !== null && a.page.id === d.id) {
                a.page = a.mainPage;
            }
            a.popups.clean();
            a.emit('popup.closed', d);
        } else {
            a.page = null;
            a.emit('page.closed', d);
        }
    }

    function e(f) {
        this.wNB = this.wN;
        /*eslint max-statements:0*/
        if (f !== "success") {
            a.emit('load.failed', {
                status:      f,
                hS:          a.currentHTTPStatus,
                u:           this.url
            });
            var g = 'Loading resource failed with status=' + f;
            if (a.currentHTTPStatus) {
                g += f(' (HTTP %d)', a.currentHTTPStatus);
            }
            g += ': ' + a.requestUrl;
            a.log(g, "warning");
            a.navigationRequested = false;
            this.bI = false;
            if (utils.isF(a.options.onLoadError)) {
                a.options.onLoadError.call(a, a, a.requestUrl, f);
            }
        }

        var h = 0, j = a.page;
        a.page = this;
        this.sTMainF();
        for (var k = this.frames.length; h < k ; h++) {
            try {
                a.switchToChildFrame(this.frames[h]);
            } catch(l) {
                break;
            }
        }
        this.framesReloaded = this.frames.slice(h);
        this.frames = this.frames.slice(0, h);

        if (this.framesReloaded.length !== 0) {
            a.emit('frame.reset', this.framesReloaded);
        }
        a.page = j;

        // local client scripts
        a.injectC(this);
        // remote client scripts
        a.includeRScripts(this);
        // Client-side utils injection
        a.injectCU(this);
        // history
        a.history.push(a.getCurrentUrl());
        a.emit('load.finished', f);
        this.lI = false;
        if (this.isP) {
            a.emit('popup.loaded', this);
        } else {
            a.emit('page.loaded', this);
        }
    }

    function f(g, h) {
        return 'Navigation requested: url=' + g + ', type=' + h + ', willNavigate=' + hWill + ', isMainFrame=' + iIsMainF;
    }

    var d = 0, hWill = false, iIsMainF = true, j = onClosing, k = onLoadFinished, l = onLoadStarted, m = onNavigationRequested, n = onPageCreated;

    function onPageCreated(p) {
        p.isP = (typeof p.isP === "undefined") ? true : false;
        p.id = new Date().getTime();
        p.bI = false;
        p.lI = false;
        p.wNB = p.wN;
        p.frames = [];
        p.framesReloaded = [];
        p.context = {
            "x": 0,
            "y": 0,
            "width": 1,
            "height": 1
        };

        p.onP = function (q) {
            return a.filter('page.prompt', q);
        };

        p.onR = function (r, s) {
            if ('fileDownload' in a._f) {
                return a.filter('fileDownload', r, s);
            }
            a.log("File to download : aborted", "debug");
            return null;
        };

        p.onRError = function (t) {
            a.emit('resource.error', t);
        };
        p.onRTimeout = function (t) {
            a.emit('resource.timeout', t);
        };
        p.onUChange= function (u) {
            a.log(f('url changed to "%s"', u), "debug");
            a.navigationRequested= false;
            a.emit('url.changed', u);
        };

        if (p.isP) {
            a.emit('popup.created', p);
            if (a.options.pageSettings.userAgent !== defaultUserAgent) {
                p.customHeaders = {"User-Agent": a.options.pageSettings.userAgent};
            }
            p.settings = utils.mergeObjects(p.settings, a.options.pageSettings);
            if (utils.isClipRect(a.options.clipRect)) {
                p.clipRect = a.options.clipRect;
            }
            if (utils.isObject(a.options.viewportSize)) {
                p.viewportSize = a.options.viewportSize;
            }
            a.popups.push(p);
        } else {
            a.emit('page.created', p);
        }
    }
    n(b);
    return b;
}