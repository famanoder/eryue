import fs from 'mz/fs';
import {join} from 'path';
import injector from '@eryue/injector';
import {getArgType, assert, _} from '@eryue/utils';
import router from './router';
import {CONFIG, MIDDLEWARES, SERVICE, MODEL} from './context-names';

export function Config(conf) {
  const [config = {}] = injector.resolve(CONFIG);
  const argType = getArgType(conf);

  assert.ok(argType.isString || argType.isObject, 'invalid argument.');

  // maybe a config file
  if(argType.isString) {
    const confFilepath = join(process.cwd(), conf);
    const has = fs.existsSync(confFilepath);
    if(has) {
      conf = require(confFilepath);
      if(conf.default) {
        conf = conf.default;
      }
    }
  }
  
  Object.assign(config, conf);
  injector.add(CONFIG, config);
  return function(target) {}
}

export function Middlewares(...arr) {
  let [middleares = []] = injector.resolve(MIDDLEWARES);
  middleares = middleares.concat(_.flatten(arr));
  injector.add(MIDDLEWARES, middleares);
  return function(target) {}
}

/**
 * @Service
 * class Test {
 *  toString() {
 *    console.log('test');
 *  }
 * }
 * 
 * cx.service.test.toString();
 */
export function Service(target) {
  const name = target.name.toLowerCase();
  const service = new target;
  let [services] = injector.resolve(SERVICE);
  if(services) {
    services[name] = service;
  }else{
    services = {
      [name]: service
    }
  }
  injector.add(SERVICE, services);
}

export function Model(target) {
  const name = target.name.toLowerCase();
  const model = new target;
  let [models] = injector.resolve(MODEL);
  if(models) {
    models[name] = model;
  }else{
    models = {
      [name]: model
    }
  }
  injector.add(MODEL, models);
}

/**
 * @Router.get('api', {
 *  user: {
 *    getUserInfo: async $helper => {
 *      const userInfo = await 'userinfo';
 *      $helper.success(userInfo);
 *    }
 *  }
 * })
 * class App extends Eryue {}
 */
const Router = {};
;['all', 'del', 'delete', 'get', 'head', 'options', 'patch', 'post', 'put'].forEach(method => {
  Router[method] = function() {
    router[method].apply(router, arguments);
    return function(target) {};
  }
});

export {Router};