function l(n){
    var s=context.getAncestors(),
        p=s.length-1,
        q=s[p];

    if ((q.type!=="Fo"||q.init!=n) &&
        (!/^For(?:In|Of)Statement/.test(q.type) || q.left!=n)) {
        checkForSemicolon(n);
    }
}