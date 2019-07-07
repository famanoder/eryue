"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _utils = require("@eryue/utils");

var _application = _interopRequireDefault(require("./application"));

var _context = _interopRequireDefault(require("./context"));

var _defaultMiddlewares = _interopRequireDefault(require("./default-middlewares"));

var _decorator = require("./decorator");

var _contextNames = require("./context-names");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withHttps({
  key,
  cert
} = {}) {
  return key && cert ? require('https').createServer({
    key,
    cert
  }, this.callback()) : this;
}

async function detectPort(port) {
  if (!port) {
    port = await (0, _utils.getPort)();
  }

  return port;
}

async function start({
  port,
  https,
  onlisten
} = {}) {
  const app = new _application.default();
  app.useAll();
  withHttps.call(app, https);
  port = await detectPort(port);
  return new Promise((rs, rj) => {
    app.listen(port, err => {
      if (err) throw err;

      if ((0, _utils.getArgType)(onlisten).isFunction) {
        onlisten.call(app, port);
      } // callback app for supertest


      rs(port, app);
    });
  });
}

let Eryue = (_dec = (0, _decorator.Middlewares)(_defaultMiddlewares.default), _dec(_class = class Eryue {
  constructor() {
    const [conf] = _injector.default.resolve(_contextNames.CONFIG);

    return start(conf);
  }

}) || _class);
exports.default = Eryue;
;