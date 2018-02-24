import startApp from './startApp';
import beforeStart from './beforeStart';
import Middlewares from './middlewares';
import Injector from './injector';
import Router from './router';

const Eryue = Object.create(Object.prototype, {
	startApp: { value: startApp },
	beforeStart: { value: beforeStart },
	Middlewares: { value: Middlewares },
	Injector: { value: Injector },
	Router: { value: Router }
});

export default Eryue;

export { Eryue, beforeStart, Middlewares, Injector, Router, startApp };