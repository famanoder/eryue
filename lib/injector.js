import vStore from './vStore';
import { getAgrsType } from './utils';

export default function(ctrls) {
	if (getAgrsType(ctrls) !== 'object') ctrls = {};
	let vInjector = vStore.props.Injector;
	if (!vInjector || getAgrsType(vInjector) !== 'object') vStore.props.injector = {};
	Object.assign(vStore.props.injector, ctrls);
	return function(target) {

	}
}