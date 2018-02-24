'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = startApp;

var _vStore = require('./vStore');

var _vStore2 = _interopRequireDefault(_vStore);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaFavicon = require('koa-favicon');

var _koaFavicon2 = _interopRequireDefault(_koaFavicon);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _utils = require('./utils');

var _router = require('./router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultPort = process.env.port || 7890;
const defaultStaticDir = './static';
const defaultStaticMaxage = 1000 * 60 * 60 * 24 * 30;

function bindRouters(router, vRoutes) {
	if (vRoutes.length) {
		vRoutes.forEach(route => {
			(0, _router.createRouter)(route.type, router, route.routes);
		});
	};
}
function beforeStartApp(fns) {
	if (fns.length) {
		fns.forEach(fn => {
			if (fn && ~(0, _utils.getAgrsType)(fn).indexOf('function')) fn(this);
		});
	};
}
function useMiddlewares(middlewares) {
	if (middlewares.length) {
		middlewares.forEach(middleware => {
			if (middleware && ~(0, _utils.getAgrsType)(middleware).indexOf('function')) this.use(middleware);
		});
	};
}
function injectProps(props) {
	return Object.assign(this.context, props);
}
function startApp(clas, callback) {
	const app = new _koa2.default();
	const _app = new clas();
	const router = (0, _koaRouter2.default)();

	let defaultStatic = { dir: defaultStaticDir, maxAge: defaultStaticMaxage };
	let { port, staticOptions, faviconPath } = _app;
	let { middlewares = [], injector = {}, beforeStart = [], routes = [] } = _vStore2.default.props;

	Object.assign(_vStore2.default.props, _app);
	app.context.config = _app;
	injectProps.call(app, injector);

	if (!port || !port > 0) port = defaultPort;

	if (!staticOptions) staticOptions = defaultStatic;
	if ((0, _utils.getAgrsType)(staticOptions) === 'string') {
		defaultStatic.dir = staticOptions;
		staticOptions = defaultStatic;
	};
	if (!staticOptions.dir) staticOptions.dir = defaultStatic.dir;
	if (!staticOptions.maxAge) staticOptions.maxAge = defaultStatic.maxAge;
	if (!faviconPath) faviconPath = _path2.default.join(staticOptions.dir, 'favicon.ico');

	(0, _utils.hasStaticDir)(staticOptions.dir);
	bindRouters(router, routes);
	beforeStartApp.call(app, beforeStart);

	useMiddlewares.call(app, [(0, _koaCompress2.default)(), (0, _koaBodyparser2.default)(), _fs2.default.existsSync(faviconPath) ? (0, _koaConvert2.default)((0, _koaFavicon2.default)(faviconPath)) : null].concat(middlewares.length ? middlewares : []).concat((0, _koaConvert2.default)((0, _koaStatic2.default)(staticOptions.dir, staticOptions))).concat(router.routes()));

	return new Promise((resolve, reject) => {
		app.listen(port, err => {
			if (err) {
				reject(err);
			} else {
				resolve(port);
			};
		});
	});
}