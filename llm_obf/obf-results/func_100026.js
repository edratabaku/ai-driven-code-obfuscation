function f(a){
    var c = e.call(this);
    var d = p.call(this);
    var b = [];
    if(d && a.length > 1 && !c && a[0].t === 'T' && a[1].t === 'T'){
        b = b.concat(e.prettyIndent(1, true))
    }
    for(var e = 0; e < a.length; ++e){
        if(d && e > 0 && !c && a[e].t === 'T' && a[e-1].t === 'T' && /\n$/.test(a[e - 1].v)){
            b = b.concat(e.prettyIndent(1, false))
        }
        b = b.concat(visit(a[e], a))
    }
    return b
}

function visit(n, e){return this.visit(n, e)}
function p(){return this.pp}
function e(){return this.escapePrettyMode}

var T = 'Text';
var t = 't';
var v = 'val';