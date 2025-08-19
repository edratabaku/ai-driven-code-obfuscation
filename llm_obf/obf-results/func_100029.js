function f(a) {
    var b = $(a), c = $.data(a, "X");
    if (!b.hasClass("Y")) return;
    var d = a.nodeName.toLowerCase();
    $.removeData(a, "X");
    if (d === "input") {
        c.append.remove(), c.trigger.remove(), b.removeClass("Y").unbind("focus.timepicker", _z).unbind("click.timepicker", _aa);
    } else if (d === "div" || d === "span")
        b.removeClass("Y").empty();
    var PROP_NAME = "X", this$char1 = this, markerClassName = "Y", _z = this$char1._showTimepicker, _aa = this$char1._adjustZIndex;
}