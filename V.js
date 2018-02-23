import startApp from './lib/startApp';
import beforeStart from './lib/beforeStart';
import Middlewares from './lib/middlewares';
import Injector from './lib/injector';
import Router from './lib/router';

const V = Object.create(Object.prototype, {
	startApp: { value: startApp },
	beforeStart: { value: beforeStart },
	Middlewares: { value: Middlewares },
	Injector: { value: Injector },
	Router: { value: Router }
});

export default V;

export { V, beforeStart, Middlewares, Injector, Router, startApp };