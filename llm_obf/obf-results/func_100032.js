function bindFocusBlur(a, b) {
    var c, d, e;

    document[0].addEventListener("click", clickHandler, !0);
    a[0].addEventListener("mousedown", mousedownHandler, !0);
    a[0].addEventListener("blur", blurHandler, !0);
    b.on("focus", focusHandler);

    function blurHandler(f) {
        if (f && f.target.nodeName !== "INPUT") return; //for IE

        d = !1;

        if (c) {
            d = !0;
            return
        }

        setTimeout(function () {
            a.triggerHandler("blur") //conflict with current live cycle (case: multiple=none + tab)
        }, 0)
    }

    function focusHandler() {
        if (!c) {
            c = !0;

            setTimeout(function () {
                a.triggerHandler("focus") //conflict with current live cycle (case: multiple=none + tab)
            }, 0)
        }
    }

    function mousedownHandler() {
        c = !0
    }

    function clickHandler(g) {
        c = !1;

        var h = g.target;
        var i = contains(a[0], h);

        if (d && !i) {
            blurHandler()
        }

        if (i && h.nodeName !== "INPUT") {
            setTimeout(function () {
                b[0].focus()
            }, 0)
        }

        if (!i && c) {
            c = !1
        }
    }

    return function () {
        document[0].removeEventListener("click", clickHandler, !0);
        a[0].removeEventListener("mousedown", mousedownHandler, !0);
        a[0].removeEventListener("blur", blurHandler, !0);
        b.off("focus", focusHandler)
    }
}

function contains(j, k) {
    while (k && k != j) {
        if (k.nodeType == 8 || k.nodeType == 3) {
            k = k.parentNode
        } else {
            k = k.nextSibling
        }
    }
    return !!k
}