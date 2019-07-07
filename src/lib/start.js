import injector from '@eryue/injector';
import {getPort, getArgType} from '@eryue/utils';
import Application from './application';
import eryueContext from './context';
import middlewares from './default-middlewares';
import {Middlewares} from './decorator';
import {CONFIG} from './context-names';

function withHttps({ key, cert } = {}) {
	return key && cert ? require('https').createServer({ key, cert }, this.callback()) : this;
}

async function detectPort(port) {
  if(!port) {
    port = await getPort();
  }
  return port;
}

async function start({
  port,
  https,
  onlisten
} = {}) {
  const app = new Application();

  app.useAll();
  withHttps.call(app, https);
  
  port = await detectPort(port);
  return new Promise((rs, rj) => {
    app.listen(port, err => {
      if(err) throw err;
      if(getArgType(onlisten).isFunction) {
        onlisten.call(app, port);
      }
      // callback app for supertest
      rs(port, app);
    });
  });
  
}

@Middlewares(middlewares)
export default class Eryue {
  constructor() {
    const [conf] = injector.resolve(CONFIG);
    return start(conf);
  }
};