
export default {
	props: {},
	append(name, value) {
		this.props[name] = value;
	},
	get(name) {
		return this.props[name];
	}
}