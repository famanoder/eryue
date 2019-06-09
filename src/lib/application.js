import Koa from 'koa';
import injector from '@eryue/injector';
import compose from 'koa-compose';
import {CONFIG, MIDDLEWARES} from './context-names';

export default class Application extends Koa {
  constructor() {
    super();
    this[CONFIG] = injector.deps.get(CONFIG);
  }
  useAll() {
    const middlewares = injector.deps.get(MIDDLEWARES);
    this.use(compose(middlewares));
  }
}