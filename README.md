# A better way to experience koa2 !
### let`s go to see the HelloWorld !

first, you have to add a .babelrc file:
``` javascript
{
    "presets": [
        ['env', {
          "targets": {
            "node": "current"
          }
        }]
    ],
    "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```
then, add a entry file, like start.js:
``` javascript
require('babel-core/register');
require('./hello_world');
```
hello_world.js
``` javascript
import { startApp, Router } from 'eryue';

@Router.get({
	'/': 'Hello, world !'
})
class App {
	port = 1234
}

startApp(App).then(port => console.log(`a app started at port: ${port} !`));
```
