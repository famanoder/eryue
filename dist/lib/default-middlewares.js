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
    const [conf] = _injector.default.resolve(_contextNames.CONFIG);

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

async function catchError(cx, next) {
  try {
    await next();
  } catch (e) {
    console.error(' Catch middleware error: \n', e);

    const [context] = _injector.default.resolve(_contextNames.ERYUE_CONTEXT);

    context.helper.failed(500, {
      code: 500,
      msg: e.message || 'Internal Server Error.'
    });

    const [$body = {}] = _injector.default.resolve(_contextNames.BODY);

    const {
      status,
      body
    } = $body;
    cx.status = status;
    cx.body = body;
  }
}

const middlewares = [catchError, (0, _koaCompress.default)(), (0, _koaBodyparser.default)(), loadConfig(withStatic), loadConfig(withFavicon), _router.loadRoutes];

var _default = (0, _koaCompose.default)(middlewares);

exports.default = _default;