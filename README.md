>  a nodejs framework base on Koajs and enhanced it!

### Usage

-----

* **Install**

```js
npm i @eryue/core
// or
yarn add @eryue/core
```

* **Hello, world !**

```js
import Eryue, {Router, Config} from '@eryue/core';

@Config({
  port: 1234,
  onlisten(port) {
    console.log('an app server started at ' + port);
  }
})
@Router.get({
  greet: 'Hello, world !'
})
class App extends Eryue {}

new App();

// curl localhost:1234/greet
// => Hello, world ! 
```

### Decorators

-----

* **@Config(Object|String)**

we can bind our app's config from here, if option is String, we'll try ensure it exists and require it as config, or just an Object, then we can visit it by `cx.config`;

eg: 

```js
@Config({
  port: 1234
})
// or 
@Config('app.config.js')

// app.config.js
module.exports = {
  port: 1234
}
```

* **@Router[all|get|put|post|patch|del|delete](prefix, Object)**

we provide a very nice way to make your router Configurable & Combinable & Reusable, yeah, just a function mapping. see detail [koa-router-mapping](https://github.com/famanoder/koa-router-mapping);

let's define a api, eg: `/api/user/getUserInfo`.

we recommand ervery api is a function or an array of function. consider the following pseudocode example.

```js
async function getUserInfo(cx, next) {
  const userInfo = await cx.service.getUserInfo(userId);
  cx.body = userInfo;
}

// api path can be splited by '/'
@Router.get('api', {
  'user/getUserInfo': getUserInfo
})
class App extends Eryue {}

new App();
```

and so on, base on some functions, our api definition become to Combinable & Reusable.

* **@Middlewares**

