function a(b){
    var c = d(e()), f = b.id, g = b.typeName;
    if (1 === f) {
        h('Register Type \'' + encodeString(g) + '\' by name [' + f + ']');
    }
    typeByName[g] = b;
    return b;
}