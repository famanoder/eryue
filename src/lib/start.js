import injector from '@eryue/injector';
import portfinder from 'portfinder';
import Application from './application';
import middlewares from './default-middlewares';
import {Middlewares} from './decorator';
import {CONFIG} from './context-names';

function withHttps({ key, cert } = {}) {
	return key && cert ? require('https').createServer({ key, cert }, this.callback()) : this;
}

async function detectPort(port) {
  port = port || process.env.NODE_PORT;
  if(!port) {
    try{
      port = await portfinder.getPortPromise();
    }catch(e){
      throw e;
    }
  }
  return port;
}

async function start({
  port,
  https
} = {}) {
  const app = new Application();

  port = await detectPort(port);

  app.useAll();

  withHttps
  .call(app, https)
  .listen(port, p => {
    console.log('listening on '+port)
  });

  return app;
}

@Middlewares(middlewares)
export default class Eryue {
  constructor() {
    const conf = injector.deps.get(CONFIG);
    return start(conf);
  }
};