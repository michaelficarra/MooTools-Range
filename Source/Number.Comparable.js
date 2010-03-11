/*
---
description: Provides comparable mixin methods (next,compare) for the Number class.
license: LGPL
authors:
- Michael Ficarra
requires:
- core/1.2.4:Core
provides: [Number.Comparable]
...
*/

Number.implement({
	next: function(){ return this+1; },
	// UFO operator (<=>)
	compare: function(i) {
		if(i<this) return 1;
		if(i>this) return -1;
		return 0;
	}
});

/* Copyright 2010 Michael Ficarra
This program is distributed under the (very open)
terms of the GNU Lesser General Public License */
