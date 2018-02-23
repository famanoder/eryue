import path from 'path';
import vStore from './vStore';
import { getAgrsType } from './utils';

function createRouter(type, router, routesMap){
	console.log(`[routes]`);
	console.log(routesMap);

	const routes = Object.keys(routesMap);
	routes.forEach(route => {
			let _handles = routesMap[route];
			_handles = ~getAgrsType(_handles).indexOf('function')? 
						[_handles]: 
						getAgrsType(_handles)=='array'?
						_handles:
						[function(){}];
			let args = {
				0: path.join('/', route),
				length: 1
			}
			_handles.forEach((handle, i) => {
				args[i + 1] = handle;
				args.length++;
			});
			router[type].apply(router, args);
	});
}
function mapRouters(type, prefix, routesConfig) {
	let vRoutes = vStore.props.routes;
	if (!vRoutes || getAgrsType(vRoutes) !== 'array') vStore.props.routes = [];

	let routes = {};
	let validateFuncs = function(agrs) {
		let _type = getAgrsType(agrs);
		return (!!~_type.indexOf('function') || 
			(_type === 'array' && agrs.every(agr => ~getAgrsType(agr).indexOf('function'))));
	}
	let mapRoutesConf = function(conf, parentKey) {
		let routesConf = Object.keys(conf);
		routesConf.forEach(rf => {
			let routeHandle = conf[rf];
			let key = path.join(parentKey || '', rf);
			if(validateFuncs(routeHandle)) {
				routes[key] = routeHandle;
			}else if(getAgrsType(routeHandle) === 'object') {
				mapRoutesConf(routeHandle, key);
			}else{
				routes[key] = async cx => cx.body = String(routeHandle);
			}
		})
	};
	mapRoutesConf(routesConfig, prefix);
	vStore.props.routes.push({
		type,
		routes
	});
}
const Router = {};
const methods = ['get', 'post', 'del', 'put'];
methods.forEach(method => {
	Router[method] = function(prefix, conf) {
		if (getAgrsType(prefix) === 'object' && !conf) {
			conf = prefix;
			prefix = '';
		};
		mapRouters(method, prefix, conf);
		return function() {}
	}
});
export default Router;
export { createRouter }