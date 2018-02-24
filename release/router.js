'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createRouter = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vStore = require('./vStore');

var _vStore2 = _interopRequireDefault(_vStore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRouter(type, router, routesMap) {
	console.log(`[routes]`);
	console.log(routesMap);
	const routes = Object.keys(routesMap);
	routes.forEach(route => {
		let _handles = routesMap[route];
		_handles = ~(0, _utils.getAgrsType)(_handles).indexOf('function') ? [_handles] : (0, _utils.getAgrsType)(_handles) == 'array' ? _handles : [function () {}];
		let args = {
			0: _path2.default.join('/', route).replace(/\\+/g, '/'),
			length: 1
		};
		_handles.forEach((handle, i) => {
			args[i + 1] = handle;
			args.length++;
		});
		router[type].apply(router, args);
	});
}
function mapRouters(type, prefix, routesConfig) {
	let vRoutes = _vStore2.default.props.routes;
	if (!vRoutes || (0, _utils.getAgrsType)(vRoutes) !== 'array') _vStore2.default.props.routes = [];

	let routes = {};
	let validateFuncs = function (agrs) {
		let _type = (0, _utils.getAgrsType)(agrs);
		return !!~_type.indexOf('function') || _type === 'array' && agrs.every(agr => ~(0, _utils.getAgrsType)(agr).indexOf('function'));
	};
	let mapRoutesConf = function (conf, parentKey) {
		let routesConf = Object.keys(conf);
		routesConf.forEach(rf => {
			let routeHandle = conf[rf];
			let key = _path2.default.join(parentKey || '', rf);
			if (validateFuncs(routeHandle)) {
				routes[key] = routeHandle;
			} else if ((0, _utils.getAgrsType)(routeHandle) === 'object') {
				mapRoutesConf(routeHandle, key);
			} else {
				routes[key] = async cx => cx.body = String(routeHandle);
			}
		});
	};
	mapRoutesConf(routesConfig, prefix);
	_vStore2.default.props.routes.push({
		type,
		routes
	});
}
const Router = {};
const methods = ['get', 'post', 'del', 'put'];
methods.forEach(method => {
	Router[method] = function (prefix, conf) {
		if ((0, _utils.getAgrsType)(prefix) === 'object' && !conf) {
			conf = prefix;
			prefix = '';
		};
		mapRouters(method, prefix, conf);
		return function () {};
	};
});
exports.default = Router;
exports.createRouter = createRouter;