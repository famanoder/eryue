import Koa from 'koa';
import injector from '@eryue/injector';
import compose from 'koa-compose';
import {CONFIG, MIDDLEWARES} from './context-names';

export default class Application extends Koa {
  constructor() {
    super();
    const [config] = injector.resolve(CONFIG);
    this.context.config = config;
  }
  useAll() {
    const [middlewares] = injector.resolve(MIDDLEWARES);
    this.use(compose(middlewares));
  }
}