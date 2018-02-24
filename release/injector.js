'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (ctrls) {
	if ((0, _utils.getAgrsType)(ctrls) !== 'object') ctrls = {};
	let vInjector = _vStore2.default.props.Injector;
	if (!vInjector || (0, _utils.getAgrsType)(vInjector) !== 'object') _vStore2.default.props.injector = {};
	Object.assign(_vStore2.default.props.injector, ctrls);
	return function (target) {};
};

var _vStore = require('./vStore');

var _vStore2 = _interopRequireDefault(_vStore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }