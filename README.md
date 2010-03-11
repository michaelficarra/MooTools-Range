Range
=====

A class to represent a range of values, inspired by [Ruby's Range class](http://ruby-doc.org/core/classes/Range.html)


How To Use
----------

A range can be generated with any class that implements the compare and next methods. The compare method acts as the UFO operator, and the next method should return the next logical member of the given class. The Number.Comparable implementation included with the Range class can be seen below.

	Number.implement({
		next: function(){ return this+1; },
		// UFO operator (<=>)
		compare: function(i) {
			if(i<this) return 1;
			if(i>this) return -1;
			return 0;
		}
	});

Generate a Range of Numbers
	
	var twoDigitIntegers = new Range(10,99);	// (10..99)
	
By default, the Range includes the ending value. Use the "inclusive" option to change this behaviour.

	var twoDigitIntegers = new Range(10,100,{inclusive:false});	// (10...100)

See [Ruby's Range class documentation](http://ruby-doc.org/core/classes/Range.html) for more examples on using a "comparable" class that supports the "next" (succ) and "compare" (UFO operator) methods.

Other Features
--------------

### first
Simply returns the element that begins the range.
	
	(new Range(5,9)).first()	// 5

### last
Returns the element defined as the range end, regardless of inclusiveness.
	
	var myRange = new Range(0,20)		// [Object:myRange]
	range.toArray().getLast()			// 20
	range.last()						// 20

	var myRange = new Range(0,20,{inclusive:false})		// [Object:myRange]
	range.toArray().getLast()							// 19
	range.last()										// 20

### toArray
Calculates 

Additional Info
---------------

I am always open for feature requests or any feedback.
I can be reached at [Github](http://github.com/michaelficarra).

Thanks go out to the Ruby community for the original idea and implementation.
