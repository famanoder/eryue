export function getArgType(arg){
	return Object.prototype.toString.call(arg).toLowerCase().match(/\s(\w+)/)[1];
}

export function simpleTemplate(templ,conf){
	let pars=templ&&templ.match(/{.+?}/g);
	if (pars) {
		pars=pars.map(p=>{return p.replace(/{\s*(\w+).*?}/,'$1')});
		pars.forEach((c,i)=>{
			let reg=new RegExp('{\\s*'+c+'\\s*(?:=\\s*(\\S*?))?\\s*?}','g');
			templ=templ.replace(reg,(a,b)=>{
				return getArgType(conf[c])=='function'?conf[c]():(conf[c]?conf[c]:(b?b:''));
			});
		});
	}
	return templ;
}