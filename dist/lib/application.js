"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _context = _interopRequireDefault(require("./context"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Application extends _koa.default {
  constructor() {
    super();

    _context.default.call(this);
  }

  useAll() {
    const [middlewares] = _injector.default.resolve(_contextNames.MIDDLEWARES);

    this.use((0, _koaCompose.default)(middlewares));
  }

}

exports.default = Application;