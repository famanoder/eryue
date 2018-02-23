import fs from 'fs';
import mkdirp from 'mkdirp';

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

export {
	getAgrsType,
	hasStaticDir
}