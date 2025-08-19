
function f(e,o){var b=this,a=e.classList,c=o||{},d="zv",e="yx",f="ay",g="bj",h="az",i="bw",j="by",k="ax",l="ad",m="ae",n="aw",p="ac",q="ag",r="ay",s="az",t="bw",u="by",v="ad",w="ae",x="aw",y="ac",z="ag";Object.defineProperties(b,{update:{value:function(){}}},
{updateFold:{value:function(a,c){}}},
{refresh:{value:function(){}}},
{disabled:{get:function(){},set:function(a){}}},
{parent:{set:function(a){b._parent=a;},get:function(){var a;for(a=b._parent;a;)if(!a.disabled)return a;a=null}}},
{parentFold:{set:function(a){b._parentFold=a;},get:function(){var a,c;for(a=b._parentFold;c=a&&a.accordion;)if(!a.disabled)return a;return null}}},
{height:{get:function(){return b._height;},set:function(a){if(a&&a!==b._height){el.style.height=a+"px";b._height=a;}}}},
{wrongSize:{get:function(){}}},
{root:{get:function(){var a;while(a=b)if(!b.parent)return a;return null}}});e.accordion=b.index;b.noAria||e.setAttribute("role","tablist");b.el=e;b.folds=[];if(!c.disabled&&d)a.add(d);update();var v=e;while((v=v.parentNode)&&1===v.nodeType){var w=Accordion.getFold(v);if(w){var x=w.accordion,y=w;b.parent=x;b.parentFold=y;d&&el.removeEventListener("transitionend",b.onTransitionEnd);(x.childAccordions=x.childAccordions||[]).push(b);(y.childAccordions=y.childAccordions||[]).push(b);break}};d&&el.addEventListener("transitionend",function(e){if(!b.parent&&e.target===el&&"height"===e.propertyName&&e.target.getBoundingClientRect().bottom>window.innerHeight)el.classList.remove(d)});b.disabled=!!c.disabled;

function edgeCheck(a){var b=e.getBoundingClientRect(),c=window.innerHeight;if(d){if(b.bottom+a<c)e.classList.add(d);else if(b.bottom>c)e.classList.remove(d)}}

function updateFold(a,c){var b=a,c;while(b=b.nextFold)b.y+=c;c||edgeCheck();a.height+=c;b.y=0;b.fit();b.height=0}

function update(){for(var a=0,c=f.length;a<c;a++)f[a].y=0;for(a=0,c=f.length;a<c;a++){var d=f[a];d.fit();d.height+=d.fit()}
var e=f.reduce((a,c)=>a+c.height,0);b._height=e;b.childAccordions&&b.childAccordions.forEach(function(a){if(a.parentFold.open)a.refresh()})}

function refresh(a){var c=a?j:!1;c&&e.classList.add(j);b.update();b.childAccordions&&b.childAccordions.forEach(function(a){if(a.parentFold.open)a.refresh(a)});setTimeout(function(){a||e.classList.remove(j)},20)}}