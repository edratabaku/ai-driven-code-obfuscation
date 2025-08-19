
function r(p,v,s){return function(o){var i=j(o,k(p,s),!0);return i.valid&&a(i.t,v)}}

function j(o,p,b){for(var a=[],l=0;l<p.length;l++)a[l]=o[p[l]];return{valid:a.length===p.length,target:a[p.length-1]}}

function k(p,s){var a='',l;for(l=0;l<p.length;l++){a+=p[l]+s+((l+1)<p.length?p[l+1]:'');if(a.length>100){a+=';';}else{a+=','} } return a;}

function _getPathInfo(o, p, b) { /* ... */ }

function _toPathParts(p, s) { /* ... */ }

function areSVZ(t, v) { /* ... */ }