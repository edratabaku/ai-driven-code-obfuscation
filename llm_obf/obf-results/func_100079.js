function* j(){
	if(isNodeFn())return;
	var a=getDocument(),b=getGlobal();
	this._value=getCurrentUrl();
	domEventsAddDelegateListener(a.documentElement,"click",'a',this.anchorClickHandler);
	let c=this.originalMethods={},d=this.dispatchHandlers;
	canReflectEachKey(methodsToOverwrite,function(e){
		c[e]=window.history[e];
		window.history[e]=function(f,g,h){
			var i=urlDiffers(h,LOCATION().search+LOCATION().hash),j=0===h.indexOf("http");
			if((!i&&urlDiffs(h,window.location.pathname+LOCATION().search+LOCATION().hash)||j&&urlDiffs(h,window.location.href+LOCATION().search+LOCATION().hash))){
				c[e].apply(window.history,arguments);
				d();
			}
		};
	},this);
	domEventsAddEventListener(b,'popstate',d)
}

function urlDiffers(a,b){return a!==b;}
function LOCATION(){} // Omitted for brevity, assume it returns the current location object
function isNodeFn(){} // Omitted for brevity, assume it checks if running in Node.js environment
function getDocument(){} // Omitted for brevity, assume it returns the document object
function getGlobal(){} // Omitted for brevity, assume it returns the global object (window or global)
function domEventsAddDelegateListener(a,b,c,d){} // Omitted for brevity, assume it adds a delegated event listener to an element
function domEventsAddEventListener(a,b,c){} // Omitted for brevity, assume it adds an event listener to the window object
function canReflectEachKey(a,b){} // Omitted for brevity, assume it iterates through each key in an object and applies a function to each value
function getCurrentUrl(){} // Omitted for brevity, assume it returns the current URL
function methodsToOverwrite(){} // Omitted for brevity, assume it's an array containing 'pushState', 'replaceState' etc.