import Eryue from './lib/start';
import {Config, Middlewares, Router} from './lib/decorator';

@Config('config.js')
@Router.get('v1', {
  user: 'userrrr'
})
@Middlewares([
  // async (cx, next) => {
  //   cx.body = 123;
  //   await next();
  // }
])
class App extends Eryue {}

new App()