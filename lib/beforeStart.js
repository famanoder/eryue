import vStore from './vStore';
import { getAgrsType } from './utils';

export default function(fn) {
	if (getAgrsType(fn) === 'function') {
		let vBeforeStart = vStore.props.beforeStart;
		if (!vBeforeStart) vStore.props.beforeStart = [];
		vStore.props.beforeStart.push(fn);
	};
	return function() {}
}