"use strict";

var _start = _interopRequireDefault(require("./lib/start"));

var _decorator = require("./lib/decorator");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let App = (_dec = (0, _decorator.Config)('config.js'), _dec2 = _decorator.Router.get('v1', {
  user: 'userrrr'
}), _dec3 = (0, _decorator.Middlewares)([// async (cx, next) => {
  //   cx.body = 123;
  //   await next();
  // }
]), _dec(_class = _dec2(_class = _dec3(_class = class App extends _start.default {}) || _class) || _class) || _class);
new App();