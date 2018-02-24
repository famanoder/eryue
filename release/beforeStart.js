'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (fn) {
	if ((0, _utils.getAgrsType)(fn) === 'function') {
		let vBeforeStart = _vStore2.default.props.beforeStart;
		if (!vBeforeStart) _vStore2.default.props.beforeStart = [];
		_vStore2.default.props.beforeStart.push(fn);
	};
	return function () {};
};

var _vStore = require('./vStore');

var _vStore2 = _interopRequireDefault(_vStore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }