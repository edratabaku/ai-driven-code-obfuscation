function q(e,t,n){var r=e.file,a=r.fullPath,i=r.parentPath,o;
    var p=$.Deferred(),
        s=null,y=p.promise();
    o=ProjectManager.getProjectRoot()?ProjectManager.getProjectRoot().fullPath:null;

    if(k(a)) {
        if(l && t) {
            var u=b(t);
            u.done(function(){
                m(a,n),p.resolveWith(null,_ternNodeDomain);
            });
        } else p.resolveWith(null,_ternNodeDomain);
        l=!1;
        return;
    }
    if(t&&t.isDirty) b(t);

    l=!1,s={},x=o;

    w(),d.done(function(){
        if(r instanceof InMemoryFile){
            v(o,[]),u=m(a,!0);
            u.done(function(){
                p.resolveWith(null,_ternNodeDomain);
            });
            return;
        }

        FileSystem.resolve(i,function(e,g){
            if(e) p.resolveWith(null);
            else{
                g.getContents(function(e,h){
                    if(e){console.error("Error resolving", i);p.resolveWith(null);return;}
                    var f=h.filter(function(e){
                        return e.isFile&&!excludeFile(e);
                    }),c=[];
                    f.map(function(e){
                        return e.fullPath;
                    }).forEach(function(e){
                        c.push(e);
                    });
                    v(i,c),u=m(a,!1);
                    u.done(function(){
                        if(!modules()){
                            // Read the subdirectories of the new file's directory.
                            addAllFilesAndSubdirectories(i, function(){
                                // If the file is in the project root, then read
                                // all the files under the project root.
                                var b=i+"/";
                                if(x&&b!==x&&b.indexOf(x)===0){
                                    addAllFilesAndSubdirectories(x, function(){
                                        // prime the pump again but this time don't wait
                                        // for completion.
                                        m(a,!1);
                                        p.resolveWith(null,_ternNodeDomain);
                                    });
                                } else {
                                    p.resolveWith(null,_ternNodeDomain);
                                }
                            });
                        } else {
                            p.resolveWith(null,_ternNodeDomain);
                        }
                    });
                });
            }
        });
    });
}

function k(e) {return !h[e];}l=!1,m=primePump,n=!_ternNodeDomain,o=ProjectManager,p=$.Deferred,r=FileSystem,a=InMemoryFile,i=_ternNodeDomain,x=ProjectManager.getProjectRoot,w=ensurePreferences,y=d.promise,h={},d=deferredPreferences;