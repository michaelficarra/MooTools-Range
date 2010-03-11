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

## Methods

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
Calculates all values between the supplied beginning and end values, returning them as an array. The end value will be included unless explicitly defined in the options passed to the Range constructor.

	(new Range('a','f')).toArray().join('')					// "abcdef"
	(new Range(3,6,{inclusive:false})).toArray().join('')	// "345"

toArray results are cached. Once toArray is called, subsequent calls will be much faster. Other Range methods that iterate over all values or need access to values at arbitrary positions will also run faster after a call to toArray has been made.

### each(func(value,index,range),bind)
Iterates over every element of the range (respecting end insclusivity), calling the provided function on the element.

	var squares = {}
	(new Range(-1,3)).each(function(i){
		this[i] = i.pow(2)
	},squares)
	console.log(squares)	// { -1:1, 0:0, 1:1, 2:4, 3:9 }

### step(step,func(value,index,range),bind)
Iterates over every element of the range much like the each method, skipping {step}-1 elements between iterations.

	(new Range(0,50)).step(25,function(val,i){
		console.log(i+' => '+val)
	})
	// 0 => 0
	// 1 => 25
	// 2 => 50

### contains(value)
Determines if the Range contains the given value.

	var incl = new Range(0,2)	// (0..2)
	incl.contains(-1)		// false
	incl.contains(0)		// true
	incl.contains(1)		// true
	incl.contains(2)		// true
	incl.contains(3)		// false
	var excl = new Range(0,2,{inclusive:false})	// (0...2)
	excl.contains(-1)		// false
	excl.contains(0)		// true
	excl.contains(1)		// true
	excl.contains(2)		// false
	excl.contains(3)		// false

### valueAt(index)
Returns the value at the given index in the range. Negative numbers are supported.

	var range = new Range(20,30)	// (20..30)
	range.valueAt(0)		// 20
	range.valueAt(1)		// 21
	range.valueAt(50)		// null
	range.valueAt(-1)		// 30
	range.valueAt(-2)		// 29
	range.valueAt(-50)		// 20

	var range = new Range(20,30,{inclusive:false})	// (20...30)
	range.valueAt(0)		// 20
	range.valueAt(1)		// 21
	range.valueAt(-1)		// 29
	range.valueAt(-2)		// 28

### equals(other)
Checks equality (read: equivalency) of two ranges. If a range passes this test, it should behave exactly the same as this range. Note Note the known issues listed below.

	(new Range(0,1)).equals(new Range(0,1))							// true
	(new Range(0,1)).equals(new Range(0,2))							// false
	(new Range(0,1)).equals(new Range(0,1,{inclusive:false}))		// false


## Options

### inclusive
Determines if the end value is included as part of the range in all instance methods. Defaults to true.

### nextMethod
An optional function to use instead of the Class's next method. Allows for some very interesting ranges. Defaults to (begin.next || $lambda($chk(end) ? end : begin)).

	new Range(2,250,{nextMethod:function(){
		return this.pow(1.2).ceil();
	}}).toArray().join(',')		// "2,3,4,6,9,14,24,46,99,249"


Known Issues
------------

The equality check in the equals method is currently slightly flawed, as I have no way of determining if the provided (or inferred) next function is equal to the other range's next function. For now, it is comparing that the toString methods of the functions return the same value. This method happens to provide the correct result in the vast majority of cases, but I am convinced it is not the best way to compare functions.

Additional Info
---------------

I am always open for feature requests or any feedback.
I can be reached at [Github](http://github.com/michaelficarra).

Thanks go out to the Ruby community for the original idea and implementation.
