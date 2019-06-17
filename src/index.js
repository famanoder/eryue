import Eryue from './lib/start';
import {Config, Middlewares, Router, Service} from './lib/decorator';

@Service
class User {
  getUserList(id) {
    const users = 'users';
    return users;
  }
}

@Config('config.js')
@Router.get('v1', {
  user: async (cx, next) => {
    cx.body = cx.service.user.getUserList();
    // await next();
  }
})
@Middlewares([
  async (cx, next) => {
    cx.body = 'cx.service.user.getUserList()';
    // await next();
  }
])
class App extends Eryue {}

new App().then(port => console.log(`an app server started at ${port}.`));