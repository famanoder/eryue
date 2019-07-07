import Koa from 'koa';
import compose from 'koa-compose';
import injector from '@eryue/injector';
import createEryueContext from './context';
import {MIDDLEWARES} from './context-names';

export default class Application extends Koa {
  constructor() {
    super();
    createEryueContext.call(this, this.context);
  }
  useAll() {
    const [middlewares] = injector.resolve(MIDDLEWARES);
    this.use(compose(middlewares));
  }
}