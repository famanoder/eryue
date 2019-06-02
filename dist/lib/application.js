"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = getConfig;
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConfig() {
  return _injector.default.deps.get(_contextNames.CONFIG);
}

class Application extends _koa.default {
  constructor() {
    super();
    this[_contextNames.CONFIG] = _injector.default.deps.get(_contextNames.CONFIG);
  }

  useAll() {
    const middlewares = _injector.default.deps.get(_contextNames.MIDDLEWARES);

    this.use((0, _koaCompose.default)(middlewares));
  }

}

exports.default = Application;