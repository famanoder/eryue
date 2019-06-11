import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';
import compress from 'koa-compress';
import injector from '@eryue/injector';
import {getArgType} from '@eryue/utils';
import {loadRoutes} from './router';
import {CONFIG} from './context-names';

function loadConfig(fn) {
  return async (cx, next) => {
    const [conf] = injector.resolve(CONFIG);

    if(getArgType(fn).isFunction) {
      const middleware = fn.call(cx, conf);
      await middleware.call(cx, cx, next);
    }else{
      await next();
    }
    
  }
}

function withStatic({staticOption} = {}) {
  if(staticOption && getArgType(staticOption.root).isString) {
    return require('koa-static')(staticOption.root, staticOption);
  }
}

function withFavicon({favicon} = {}) {
  return require('koa-favicon')(favicon);
}

const middlewares = [
  compress(),
  bodyparser(),
  loadConfig(withStatic),
  loadConfig(withFavicon),
  loadRoutes
];

export default compose(middlewares);

