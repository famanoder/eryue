"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _portfinder = _interopRequireDefault(require("portfinder"));

var _application = _interopRequireDefault(require("./application"));

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
  port = port || process.env.NODE_PORT;

  if (!port) {
    try {
      port = await _portfinder.default.getPortPromise();
    } catch (e) {
      throw e;
    }
  }

  return port;
}

async function start({
  port,
  https
} = {}) {
  const app = new _application.default();
  port = await detectPort(port);
  app.useAll();
  withHttps.call(app, https).listen(port, p => {
    console.log('listening on ' + port);
  });
  return app;
}

let Eryue = (_dec = (0, _decorator.Middlewares)(_defaultMiddlewares.default), _dec(_class = class Eryue {
  constructor() {
    const conf = _injector.default.deps.get(_contextNames.CONFIG);

    return start(conf);
  }

}) || _class);
exports.default = Eryue;
;