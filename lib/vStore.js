import { checkVersion } from './utils';
const beforeStart = [checkVersion()];

export default {
	props: {
		beforeStart 
	},
	append(name, value) {
		this.props[name] = value;
	},
	get(name) {
		return this.props[name];
	}
}