'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkVersion = exports.hasStaticDir = exports.getAgrsType = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAgrsType(agrs) {
	return Object.prototype.toString.call(agrs).toLowerCase().match(/\s(\w+)\]$/)[1];
}

function hasStaticDir(dirs) {
	if (!dirs) return;
	if (!Array.isArray(dirs)) dirs = [dirs];
	dirs.forEach(dir => {
		!_fs2.default.existsSync(dir) && _mkdirp2.default.sync(dir);
	});
}
function checkVersion() {
	let nodeVersion = _package2.default.engines.node;
	if (!_semver2.default.satisfies(process.version, nodeVersion)) {
		const msg = '  You must upgrade node to >=' + nodeVersion + '.x to contine';
		throw msg;
	}
}
exports.getAgrsType = getAgrsType;
exports.hasStaticDir = hasStaticDir;
exports.checkVersion = checkVersion;