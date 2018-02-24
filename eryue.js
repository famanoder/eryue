import startApp from './lib/startApp';
import beforeStart from './lib/beforeStart';
import Middlewares from './lib/middlewares';
import Injector from './lib/injector';
import Router from './lib/router';

const Eryue = Object.create(Object.prototype, {
	startApp: { value: startApp },
	beforeStart: { value: beforeStart },
	Middlewares: { value: Middlewares },
	Injector: { value: Injector },
	Router: { value: Router }
});

export default Eryue;

export { Eryue, beforeStart, Middlewares, Injector, Router, startApp };