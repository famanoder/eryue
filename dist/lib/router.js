"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rebindHandles = rebindHandles;
exports.loadRoutes = loadRoutes;
exports.default = void 0;

var _koaRouterMapping = _interopRequireDefault(require("@eryue/koa-router-mapping"));

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _utils = require("@eryue/utils");

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouterMapping.default({
  rebindHandles
});

function rebindHandles(handles) {
  if ((0, _utils.getArgType)(handles).isFunction) {
    handles = [handles];
  }

  const newHandles = handles.map(handle => {
    return async (cx, next) => {
      const beInjected = {
        context: cx,
        config: cx.config,
        helper: cx.helper,
        next,
        service: cx.service
      };
      const injectedArgs = (0, _utils.getArgsFromFunc)(handle);

      if (injectedArgs.length) {
        const injected = injectedArgs.map(arg => {
          return arg.startsWith('$') ? beInjected[arg.slice(1)] : undefined;
        });
        await handle.apply(cx, injected);
      }

      const [$body] = _injector.default.resolve(_contextNames.BODY);

      if ($body) {
        const {
          status,
          body
        } = $body;
        cx.status = status;
        cx.body = body;
      } else {//
      }
    };
  });
  return (0, _koaCompose.default)(newHandles);
}

var _default = router;
exports.default = _default;

async function loadRoutes(cx, next) {
  const useRoutes = router.mapRoutes();
  await useRoutes.apply(cx, arguments);
}