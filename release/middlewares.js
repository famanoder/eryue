'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (arr) {
	if ((0, _utils.getAgrsType)(arr) !== 'array') arr = [];
	let vMiddlewares = _vStore2.default.props.middlewares || [];
	if ((0, _utils.getAgrsType)(vMiddlewares) !== 'array') vMiddlewares = [vMiddlewares];
	_vStore2.default.props.middlewares = vMiddlewares.concat(arr);
	return function (target) {};
};

var _vStore = require('./vStore');

var _vStore2 = _interopRequireDefault(_vStore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }