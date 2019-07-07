import Eryue from './lib/start';
import {Config, Middlewares, Router, Service} from './lib/decorator';

// function & inject

@Service
class User {
  getUserList(id) {
    const users = 'users';
    return users;
  }
}

@Config('config.js')
@Router.get('v1', {
  'user': async function($helper, $service){
    // console.log(context.config);
    // console.log($context, next, $service, $helper)
    const user = await $service.user.getUserList();
    // context.body = user;
    $helper.success(user);
    // await next();
  },
  'greet': 'Hello, world.'
})
@Middlewares([
  async (cx, next) => {
    // cx.body=cx.aa;
    cx.body = qws+'cx.service.user.getUserList()';
    // await next();
  }
])
@Register({
  middlewares: [],
  context: {},
  schedules: {}
})
class App extends Eryue {}

new App().then(port => console.log(`an app server started at ${port}.`));