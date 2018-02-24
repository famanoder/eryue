'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.startApp = exports.Router = exports.Injector = exports.Middlewares = exports.beforeStart = exports.Eryue = undefined;

var _startApp = require('./startApp');

var _startApp2 = _interopRequireDefault(_startApp);

var _beforeStart = require('./beforeStart');

var _beforeStart2 = _interopRequireDefault(_beforeStart);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _injector = require('./injector');

var _injector2 = _interopRequireDefault(_injector);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Eryue = Object.create(Object.prototype, {
	startApp: { value: _startApp2.default },
	beforeStart: { value: _beforeStart2.default },
	Middlewares: { value: _middlewares2.default },
	Injector: { value: _injector2.default },
	Router: { value: _router2.default }
});

exports.default = Eryue;
exports.Eryue = Eryue;
exports.beforeStart = _beforeStart2.default;
exports.Middlewares = _middlewares2.default;
exports.Injector = _injector2.default;
exports.Router = _router2.default;
exports.startApp = _startApp2.default;