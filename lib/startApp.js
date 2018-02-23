import vStore from './vStore';
import fs from 'fs';
import path from 'path'; 
import Koa from 'koa';
import convert from 'koa-convert';
import staticCache from 'koa-static';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import favicon from 'koa-favicon';
import KoaRouter from 'koa-router';
import { getAgrsType, hasStaticDir } from './utils';
import { createRouter } from './router';

const defaultPort = process.env.port || 7890;
const defaultStaticDir = './static';
const defaultStaticMaxage = 1000 * 60 * 60 * 24 * 30;

function bindRouters(router, vRoutes) {
	if (vRoutes.length) {
		vRoutes.forEach(route => {
			createRouter(route.type, router, route.routes);
		});
	};
}
function beforeStartApp(fns) {
	if (fns.length) {
		fns.forEach(fn => {
			if (fn && ~getAgrsType(fn).indexOf('function')) fn(this);
		});
	};
}
function useMiddlewares(middlewares) {
	if (middlewares.length) {
		middlewares.forEach(middleware => {
			if(middleware && ~getAgrsType(middleware).indexOf('function')) this.use(middleware);
		});
	};
}
function injectProps(props) {
	return Object.assign(this.context, props);
}
export default function startApp(clas, callback) {
	const app = new Koa();
	const _app = new clas();
	const router = KoaRouter();

	let defaultStatic = { dir: defaultStaticDir, maxAge: defaultStaticMaxage };
	let { port, staticOptions, faviconPath } = _app;
	let { middlewares = [], injector = {}, beforeStart = [], routes = [] } = vStore.props;

	Object.assign(vStore.props, _app);
	app.context.config = _app;
	injectProps.call(app, injector);

	if (!port || !port > 0) port = defaultPort;

	if (!staticOptions) staticOptions = defaultStatic;
	if (getAgrsType(staticOptions) === 'string') {
		defaultStatic.dir = staticOptions;
		staticOptions = defaultStatic;
	};
	if (!staticOptions.dir) staticOptions.dir = defaultStatic.dir;
	if (!staticOptions.maxAge) staticOptions.maxAge = defaultStatic.maxAge;
	if (!faviconPath) faviconPath = path.join(staticOptions.dir, 'favicon.ico');

	hasStaticDir(staticOptions.dir);
	bindRouters(router, routes);
	beforeStartApp.call(app, beforeStart);

	useMiddlewares.call(app, 
	[
		compress(),
		bodyParser(),
		fs.existsSync(faviconPath)? convert(favicon(faviconPath)): null,
	].concat(middlewares.length? middlewares: [])
	 .concat(convert(staticCache(staticOptions.dir, staticOptions)))
	 .concat(router.routes()));
	
	return new Promise((resolve, reject) => {
		app.listen(port , err => {
			if (err) {
				reject(err);
			}else{
				resolve(port);
			};
		});
	});
	
}