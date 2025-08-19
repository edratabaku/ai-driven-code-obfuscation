function b(a) {
    var c = new a.c[0].menu_tabview;
    a.click(new a.c(c));
    a.waitForOpened();

    a.d = a.getElement({type: "tabView"});
    a.e = a.d.getNode().webNavigation.document;
}
