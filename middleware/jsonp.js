import { utils } from '../modules';

const { getArgType } = utils;

function jsonp(opts = {}){
	return async function(cx, next){
		cx.jsonp = function(data){
			const callback = cx.query.jsonpCallback;

			validateReferer.call(cx, opts.acceptHosts);
			validateJsonpCallback.call(cx, callback);
			
			cx.set('Content-Type', 'application/json; charset=utf-8');
			const resJsonp = `
/******/
/******/${ callback }(${ JSON.stringify(data) });
/******/
/******/`;
			cx.body = resJsonp;
		}
		await next();
	}
}
function validateReferer(acceptHosts){
	let result = true;
	/*
	* 默认不验证referer
	*/
	if (acceptHosts === undefined || acceptHosts === '*' ) {
		result = true;
	}else{
		if (getArgType(acceptHosts) !== 'array') {
			acceptHosts = [String(acceptHosts)];
		};
		const referer = this.get('Referer');
		let fromHost = referer.match(/^[^/]*:\/\/(.+?)\//i); 
		console.log(fromHost)
		if (!fromHost) {
			result = false;
		}else{
			fromHost = fromHost[1];
			for(let i=0; i < acceptHosts.length; i++){
				let host = acceptHosts[i];
				let reg = new RegExp(host.replace(/([\.\-])/g, '\\$&').replace(/\*/g, '.*?') + '$');
				if (!reg.test(fromHost)) {
					result = false;
					break;
				};
			}
		};
	};
	if (!result) {
		this.throw(403, 'request forbidden!');
	};
}
function validateJsonpCallback(callback){
	const reg = /^[\w\.\[\]\$]{1,50}$/g;
	if (!reg.test(callback)) {
		this.throw(400, 'bad request: invalid params [jsonpCallback]');
	};
}

export default jsonp;