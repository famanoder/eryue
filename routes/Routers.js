import {
	getArgType
} from '../modules';

import pageRoutes from './pageRoutes';
import APIs from './API';

function Router(router,routesMap){
	console.log(`[routes]`);
	console.log(routesMap)
	const routes = Object.keys(routesMap);
	routes.forEach(route=>{
		let __setDefaultType__ = routesMap.__setDefaultType__;
		if (route!='__setDefaultType__') {
			router[routesMap[route].type||__setDefaultType__](
				route,
				getArgType(routesMap[route])=='function'
				?routesMap[route]
				:routesMap[route].handle||function(){}
			);
		};
	});
}
export function pageRouter(router){
	Router(router,pageRoutes);
}
export function apiRouter(router){
	Router(router,APIs);
}

