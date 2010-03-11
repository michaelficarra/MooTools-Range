String.special_char_order = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '.split('');
String.implement({
	replaceCharAt: function(at,chr){
		if(at > this.length-1 || at < this.length*-1) return this;
		if(at >= 0) return this.substr(0,at) + chr + this.substr(at+1);
		return this.substr(this.length*-1,this.length+at) + chr + (at==-1 ? '' : this.substr(at+1));
	},
	next: function(){
		if(this=='') return this;
		var str = this+'';
		var pos = str.length-1;
		if(!/[a-z0-9]/i.test(str)){
			while(pos >= 0){
				var i = String.special_char_order.indexOf(str[pos]);
				if(i >= 0){
					str = str.replaceCharAt(pos,String.special_char_order[(i+1) % String.special_char_order.length]);
					if(i<String.special_char_order.length-1) break;
				} else {
					str = str.replaceCharAt(pos,String.fromCharCode(str.charCodeAt(pos)+1));
					break;
				}
				pos--;
			}
			if(pos < 0){
				str = String.special_char_order[0] + str;
			}
		} else {
			while(pos >= 0){
				if(!/[a-z0-9]/i.test(str[pos])) {
					pos--;
					continue;
				}
				if(/\d/.test(str[pos])) {
					str = str.replaceCharAt(pos,(str[pos]=='9' ? 0 : parseInt(str[pos],10)+1).toString());
					if(str[pos]!='0') break;
				} else {
					var c = String.fromCharCode(str.charCodeAt(pos)+1);
					if(str[pos]=='z') c = 'a';
					if(str[pos]=='Z') c = 'A';
					str = str.replaceCharAt(pos,c);
					if(c.toLowerCase()!='a') break;
				}
				pos--;
			}
			if(pos < 0){
				if(str[0]=='0') str = '1'+str;
				else if(str[0]=='a') str = 'a'+str;
				else if(str[0]=='A') str = 'A'+str;
			}
		}
		return str;
	},
	// UFO operator (<=>)
	compare: function(s){
		if(this.length !== s.length) return this.length.compare(s.length);
		if(s<this) return 1;
		if(s>this) return -1;
		return 0;
	}
});
