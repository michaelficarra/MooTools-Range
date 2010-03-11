Number.implement({
	next: function(){ return this+1; },
	// UFO operator (<=>)
	compare: function(i) {
		if(i<this) return 1;
		if(i>this) return -1;
		return 0;
	}
});
