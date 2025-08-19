function q(_){
  var a=_._glPoints,b=a.length,c=_.points,d=c.length,e=_.getIndices,f=new me.Vector2d(),g,h;
  for(g=b;g<d;g++) a.push(f); // Grow internal points buffer if necessary

  for(h=0;h<d;h++){
    a[h].set(c[e()].x+_.pos.x,c[e()].y+_.pos.y);
  } // calculate all vertices

  var i = e(); // draw all triangle
  this.compositor.drawTriangle(a,i.length);
}