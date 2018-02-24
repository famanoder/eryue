import fs from 'fs';
import mkdirp from 'mkdirp';
import semver from 'semver';
import Pkg from '../package.json';

function getAgrsType (agrs) {
	return Object.prototype.toString.call(agrs).toLowerCase().match(/\s(\w+)\]$/)[1];
}

function hasStaticDir(dirs){
	if (!dirs) return;
	if (!Array.isArray(dirs)) dirs = [dirs];
	dirs.forEach(dir => {
		!fs.existsSync(dir) && mkdirp.sync(dir);
	});
}
function checkVersion() {
	let nodeVersion = Pkg.engines.node;
	if (!semver.satisfies(process.version, nodeVersion)) {
		const msg = '  current node version: '+ process.version +' \n  You must upgrade node to >=' + nodeVersion + '.x to contine';
    throw msg;
  }
}
export {
	getAgrsType,
	hasStaticDir,
	checkVersion
}