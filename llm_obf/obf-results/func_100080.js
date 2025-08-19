function r(o){
    var b=this.segments,a=b.length,c=(a===0)?0:1;
    if (c) {
        o=o||{},d=o.precision,(e=o.segmentSubdivisions)||(e=p({precision:d}));
        var f,g;
        for (f=0;f<a;f++){
            g=b[f],h=e[f],c+=g.length({subdivisions:h});
        }
    }
    return c;
    function p(s){return s.precision===undefined?this.PRECISION:s;}
}