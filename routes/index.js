import { utils } from '../modules';
import pageRoutes from './apis/pageRoutes';
import APIs from './apis/API';

const Routes = [pageRoutes, APIs];

function Router(router,routesMap){
	console.log(`[routes]`);
	console.log(routesMap);

	/**
		* support: Function | {handle: Function, type} | Array<Function>
		*/

	const routes = Object.keys(routesMap);
	routes.forEach(route=>{
		let __setDefaultType__ = routesMap.__setDefaultType__;
		if (route!='__setDefaultType__') {
			let _handles = routesMap[route];
			_handles = utils.getArgType(_handles)=='function'? 
						[_handles]: 
						utils.getArgType(_handles)=='array'?
						_handles:
						utils.getArgType(_handles)=='object'?
						[_handles.handle]:
						[function(){}];
			let args = {
				0: route,
				length:1
			}
			_handles.forEach((handle,i) => {
				args[i+1] = handle;
				args.length++;
			});
			router[routesMap[route].type||__setDefaultType__].apply(router, args);
		};
	});
}

export default function routes(router){
	Routes.forEach(route => Router(router,route));
	// 404
	['get','post','put','del'].forEach((m)=>{
		router[m]('*',async (cx,next)=>{
			// await next();
			cx.response.redirect('/404.html');
		});
	});
	return router.routes();
}
