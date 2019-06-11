import Eryue from './lib/start';
import {Config, Middlewares, Router} from './lib/decorator';

@Config('config.js')
@Router.get('v1', {
  user: 'userrrr'
})
@Middlewares([
  async (cx, next) => {
    cx.body = cx.config
    // await next();
  }
])
class App extends Eryue {}

new App().then(port => console.log(`an app server started at ${port}.`));