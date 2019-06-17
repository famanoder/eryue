import Koa from 'koa';
import compose from 'koa-compose';
import injector from '@eryue/injector';
import {CONFIG, MIDDLEWARES, SERVICE} from './context-names';

export default class Application extends Koa {
  constructor() {
    super();
    this.bindContext({
      config: CONFIG,
      service: SERVICE
    });
  }
  bindContext(fields) {
    for(const field in fields) {
      const [injectVal] = injector.resolve(fields[field]); 
      this.context[field] = injectVal;
    }
  }
  useAll() {
    const [middlewares] = injector.resolve(MIDDLEWARES);
    this.use(compose(middlewares));
  }
}