import fs from 'fs';
import mkdirp from 'mkdirp';

export default function hasStaticDir(dirs){
	if (!dirs) return;
	if (!Array.isArray(dirs)) dirs = [dirs];
	dirs.forEach(dir => {
		!fs.existsSync(dir) && mkdirp.sync(dir);
	});
}