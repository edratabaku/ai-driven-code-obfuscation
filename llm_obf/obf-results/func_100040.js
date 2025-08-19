function a(p){
  b.debug({p: p}, "FH-MBAAS-CLIENT: validateCommonParams");
  var q = ["m", "d", "rP", "e", "do"];

  var r = validateParamsPresent(q, p);

  if (r) {
    return r;
  }

  c.debug('rP :: ', p.rP);
  if (_.isObject(p.rP)) {
    c.debug('rP Is Object, returning path key !!! ', p.rP);
    return p.rP.k;

  }

  //If it is a file request, the data entry must contain file params.
  if (p.fR && p.fUR) {
    r = validateParamsPresent(["n", "t", "s", "sT"], p.d);
  }

  return r;
}