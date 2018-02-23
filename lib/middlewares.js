import vStore from './vStore';
import { getAgrsType } from './utils';

export default function(arr) {
	if (getAgrsType(arr) !== 'array') arr = [];
	let vMiddlewares = vStore.props.middlewares || [];
	if (getAgrsType(vMiddlewares) !== 'array') vMiddlewares = [vMiddlewares];
	vStore.props.middlewares = vMiddlewares.concat(arr);
	return function(target) {

	}
}