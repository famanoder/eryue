"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _koaCompress = _interopRequireDefault(require("koa-compress"));

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _utils = require("@eryue/utils");

var _router = require("./router");

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadConfig(fn) {
  return async (cx, next) => {
    const conf = _injector.default.deps.get(_contextNames.CONFIG);

    if ((0, _utils.getArgType)(fn).isFunction) {
      const middleware = fn.call(cx, conf);
      await middleware.call(cx, cx, next);
    } else {
      await next();
    }
  };
}

function withStatic({
  staticOption
} = {}) {
  if (staticOption && (0, _utils.getArgType)(staticOption.root).isString) {
    return require('koa-static')(staticOption.root, staticOption);
  }
}

function withFavicon({
  favicon
} = {}) {
  return require('koa-favicon')(favicon);
}

const middlewares = [(0, _koaCompress.default)(), (0, _koaBodyparser.default)(), loadConfig(withStatic), loadConfig(withFavicon), _router.loadRoutes];

var _default = (0, _koaCompose.default)(middlewares);

exports.default = _default;