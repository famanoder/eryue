import Eryue from './lib/start';
import {Config, Middlewares} from './lib/decorator';

@Config('config.js')
@Middlewares([
  async (cx, next) => {
    cx.body = 123;
    await next();
  }
])
class App extends Eryue {}

new App()