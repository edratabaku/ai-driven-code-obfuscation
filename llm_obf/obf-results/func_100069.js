function b(s,c){
    var t = s || '';
    if(typeof c === 'object' && !Array.isArray(c)) {
        console.error(formatter(t,c));
    } else {
        console.error.apply(console, arguments);
    }
    return b;
}