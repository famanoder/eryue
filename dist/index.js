"use strict";

var _start = _interopRequireDefault(require("./lib/start"));

var _decorator = require("./lib/decorator");

var _class, _dec, _dec2, _dec3, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let User = (0, _decorator.Service)(_class = class User {
  getUserList(id) {
    const users = 'users';
    return users;
  }

}) || _class;

let App = (_dec = (0, _decorator.Config)('config.js'), _dec2 = _decorator.Router.get('v1', {
  user: async (cx, next) => {
    cx.body = cx.service.user.getUserList(); // await next();
  }
}), _dec3 = (0, _decorator.Middlewares)([async (cx, next) => {
  cx.body = 'cx.service.user.getUserList()'; // await next();
}]), _dec(_class2 = _dec2(_class2 = _dec3(_class2 = class App extends _start.default {}) || _class2) || _class2) || _class2);
new App().then(port => console.log(`an app server started at ${port}.`));