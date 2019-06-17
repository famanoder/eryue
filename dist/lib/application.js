"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Application extends _koa.default {
  constructor() {
    super();
    this.bindContext({
      config: _contextNames.CONFIG,
      service: _contextNames.SERVICE
    });
  }

  bindContext(fields) {
    for (const field in fields) {
      const [injectVal] = _injector.default.resolve(fields[field]);

      this.context[field] = injectVal;
    }
  }

  useAll() {
    const [middlewares] = _injector.default.resolve(_contextNames.MIDDLEWARES);

    this.use((0, _koaCompose.default)(middlewares));
  }

}

exports.default = Application;