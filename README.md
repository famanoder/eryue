[![Build Status](https://travis-ci.org/famanoder/eryue.svg?branch=dev)](https://travis-ci.org/famanoder/eryue)

>  A framework for full stack development of Nodejs for SMEs(small and medium-sized enterprises)！

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
import Eryue, {Router} from '@eryue/core';

@Router.get({
  greet: 'Hello, world !'
})
class App extends Eryue {}

new App();

// curl localhost:8000/greet
// => Hello, world ! 
```

### Decorators

----- 

* **@Config(Object|String)**

we can bind our app's config from here, if option is String, we'll think it's a file and try to ensure it exists then require it as config, or just an Object, some time we can visit it by `cx.config`;

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

* all provided config items:

```js
{
  // port: 8080,
  // favicon: '',
  // staticOption: {
  //   root: 'static'
  // },
  // https: {
  //   key: '',
  //   cert: ''
  // },
  // onlisten(port) {
  //   console.log('an app listening on ' + port);
  // }
}
```

* **@Router[all|get|put|post|patch|del|delete](prefix, Object)**

we provide a very nice way to make your router Configurable & Combinable & Reusable, yeah, just a function mapping. see detail [koa-router-mapping](https://github.com/famanoder/koa-router-mapping);

let's define a api, eg: `/api/user/getUserInfo`.

we recommand every api is a function or an array of function. consider the following pseudocode example.

```js
async function getUserInfo($service, $helper) {
  const userInfo = await $service.getUserInfo(userId);
  $helper.success(userInfo);
}

// api path can be splited by '/'
@Router.get('api', {
  'user/getUserInfo': getUserInfo
})
class App extends Eryue {}

new App();
```

as you see, `getUserInfo` just a function and has injected two params `$service` and `$helper`, there is too many params can be injected to our **Router** function, eg: `$context`/`$next`/`$service`/`$helper` and so on, actually, this is very pure for our api definition. as you like, you can look it as controler! 

* **@Middlewares**

* **@Service**
