import Koa from 'koa';
import compose from 'koa-compose';
import injector from '@eryue/injector';
import eryueContext from './context';
import {MIDDLEWARES} from './context-names';

export default class Application extends Koa {
  constructor() {
    super();
    eryueContext.call(this);
  }
  useAll() {
    const [middlewares] = injector.resolve(MIDDLEWARES);
    this.use(compose(middlewares));
  }
}