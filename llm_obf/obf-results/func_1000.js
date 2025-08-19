function z(n,h){
	var p=function(o){
		// stop the progress spinner in the launch config dropdown trigger
		this.setY({
			error: o||!0 //if no error was passed in we still want to ensure that the error state is recorded
		});
	}.bind(this);

	if(n){
		this._x=n;
		this._setLabel(n);

		if(h){
			this._displayCheck(n);
			var s=Date.now();
			this._checkStatus(n).then(function(_){
				var i=Date.now()-s;
				mMetrics.logTiming("deployment","check status (config)",i,n.type); //$NON-NLS-1$ //$NON-NLS-2$

				n.status=_;
				this._update(n);
			}.bind(this),p);
		}else{
			// do not check the status, only set it in the UI if it is already in the launchConfiguration
			if (n.status) {
				this.setY(n.status);
			}
		}
	} else {
		this._stopPolling(); //stop before clearing selected config
		this._x=null;
		this._setLabel(null);
		this.setY({});
	}
	this._menuCache=[];
}