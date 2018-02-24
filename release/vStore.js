'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

const beforeStart = [(0, _utils.checkVersion)()];

exports.default = {
	props: {
		beforeStart
	},
	append(name, value) {
		this.props[name] = value;
	},
	get(name) {
		return this.props[name];
	}
};