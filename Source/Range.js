var Range = new Class({
	Implements: Options,
	options: {
		inclusive: true,
		nextMethod: null
	},
	initialize: function(begin,end,options) {
		this.begin = begin;
		this.end = $chk(end) ? end : begin;
		this.options.nextMethod = this.begin.next || $lambda($chk(end) ? end : begin);
		this.setOptions(options||{});
		return this;
	},
	first: function(){ return this.begin; },
	last: function(){ return this.end; },
	toArray: function(){
		var currentValue=this.begin;
		this.internalArray=[];
		do {
			this.internalArray.push(currentValue);
			currentValue=this.options.nextMethod.call(currentValue);
		} while(this.end.compare(currentValue) >= (this.options.inclusive ? 0 : 1));
		this.toArray = $lambda(this.internalArray);
		return this.toArray();
	},
	each: function(fn,bind){
		if($defined(this.internalArray)) return $each(this.internalArray,fn,bind);
		var index=0, currentValue=this.begin;
		do {
			fn.call(bind,currentValue,index++,this);
			currentValue=this.options.nextMethod.call(currentValue);
		} while(this.end.compare(currentValue) >= (this.options.inclusive ? 0 : 1));
		return this;
	},
	step: function(step,fn,bind){
		if(step < 1) return;
		this.each(function(currentValue,index,range){
			if((index % step)==0) fn.call(bind,currentValue,index/step,range)
		},bind);
	},
	contains: function(val){
		return this.begin.compare(val) < 1 && this.end.compare(val) >= (this.options.inclusive ? 0 : 1);
	},
	valueAt: function(index){
		if($defined(this.internalArray) || index<0) {
			var arr = this.toArray();
			if(index.abs()>arr.length) return null;
			return this.toArray().slice(index)[0];
		}
		var i=0, currentValue=this.begin;
		for(var i=0; i<index; i++){
			currentValue = this.options.nextMethod.call(currentValue);
			if(this.end.compare(currentValue)<(this.options.inclusive ? 0 : 1)) return null;
		};
		return currentValue;
	},
	equals: function(range){
		return (
			range.end == this.end
			&& range.begin == this.begin
			&& range.options.inclusive == this.options.inclusive
			&& range.options.nextMethod.toString() == this.options.nextMethod.toString()
		);
	},
	toString: function(){ return '('+this.begin.inspect()+(this.options.inclusive ? '..' : '...')+this.end.inspect()+')'; }
});
