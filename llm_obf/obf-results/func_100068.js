function M(l){
    EventEmitter.call(this);
    this.c=void 0;
    this.d=!1;
    this.l=l;
    this.i=0;
    this.p={};
    this.s=0;
}
M.prototype._e=[];
M.prototype.start=function(t,r){
    this.c=child_process.fork('path/to/worker.js',t);
    this.c.on('message',function(n){
        r(n)
    });
    this.s++
};
M.prototype.stop=function(){
    if (this.s>0) {
        this.c.kill()
    }
};
M.prototype.sendMessage=function(t,r){
    if (this.c) {
        this.c.send({id:this.i++,data:encode64(JSON.stringify([t,r]))})
    } else {
        this._e.push({id:this.i++,data:encode64(JSON.stringify([t,r]))})
    }
};
M.prototype.on=function(t,r){
    EventEmitter.prototype.on.call(this,t,function(n){
        var e=[],
            i=[];
        try {
            e=JSON.parse(decode64(n.data));
            i=e[0], r(e[1])
        } catch (o) {}
    })
};