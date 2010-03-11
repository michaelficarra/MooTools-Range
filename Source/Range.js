var Range = new Class({
	Implements: Options,
	options: {
		inclusive: true,
		next_function: null
	},
	initialize: function(begin,end,options) {
		this.begin = begin;
		this.end = $chk(end) ? end : begin;
		this.options.next_function = this.begin.next || $lambda(end || begin);
		this.setOptions(options||{});
		return this;
	},
	first: function(){ return this.begin; },
	last: function(){ return this.end; },
	toArray: function(){
		var current_value=this.begin;
		this.internal_array=[];
		do {
			this.internal_array.push(current_value);
			current_value=this.options.next_function.call(current_value);
		} while(this.end.compare(current_value) >= (this.options.inclusive ? 0 : 1));
		this.toArray = $lambda(this.internal_array);
		return this.toArray();
	},
	each: function(fn,bind){
		if($defined(this.internal_array)) return this.internal_array.each(fn,bind);
		var index=0, current_value=this.begin;
		do {
			fn.call(bind,current_value,index++,this);
			current_value=this.options.next_function.call(current_value);
		} while(this.end.compare(current_value) >= (this.options.inclusive ? 0 : 1));
		return this;
	},
	step: function(step,fn,bind){
		if(step < 1) return;
		this.each(function(current_value,index,range){
			if((index % step)==0) fn.call(bind,current_value,index/step,range)
		},bind);
	},
	contains: function(val){
		return this.begin.compare(val) < 1 && this.end.compare(val) >= (this.options.inclusive ? 0 : 1);
	},
	value_at: function(index){
		if($defined(this.internal_array) || index<0) return this.toArray().slice(index)[0];
		var i=0, current_value=this.begin;
		for(var i=0; i<index; i++){
			current_value = this.options.next_function.call(current_value);
			if(this.end.compare(current_value)<(this.options.inclusive ? 0 : 1)) return null;
		};
		return current_value;
	},
	equals: function(range){
		return (
			range.end == this.end
			&& range.begin == this.begin
			&& range.options.inclusive == this.options.inclusive
			&& range.options.next_function.toString() == this.options.next_function.toString()
		);
	},
	toString: function(){ return '('+this.begin.inspect()+(this.options.inclusive ? '..' : '...')+this.end.inspect()+')'; },
	inspect: function(){ return '(new Range('+this.begin.inspect()+','+this.end.inspect()+','+$H(this.options).inspect()+'))'; }
});
