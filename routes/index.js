import {
	pageRouter,
	apiRouter
} from './Routers';

export default function routes(router){
	pageRouter(router);
	apiRouter(router);
	// 404
	['get','post','put','del'].forEach((m)=>{
		router[m]('*',async (cx,next)=>{
			// await next();
			cx.response.redirect('/404.html');
		});
	});
	return router.routes();
}

