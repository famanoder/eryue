import fs from 'mz/fs';
import {join} from 'path';
import injector from '@eryue/injector';
import {getArgType, assert, _} from '@eryue/utils';
import {CONFIG, MIDDLEWARES} from './context-names';

export function Config(conf) {
  const config = injector.deps.get(CONFIG) || {};
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
  let middleares = injector.deps.get(MIDDLEWARES) || [];
  middleares = middleares.concat(_.flatten(arr));
  injector.add(MIDDLEWARES, middleares);
  return function(target) {}
}