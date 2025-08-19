function r(o, e) {
	if (e && (typeof e === 'object')) {
		['a', 'b'].forEach(function(p) {
			if (p in e) {
				this[p] = e[p];
			}
		}, o);
	}

	return o;
}