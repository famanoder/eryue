"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rebindHandles = rebindHandles;
exports.loadRoutes = loadRoutes;
exports.default = void 0;

var _koaCompose = _interopRequireDefault(require("koa-compose"));

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _koaRouterMapping = _interopRequireDefault(require("@eryue/koa-router-mapping"));

var _utils = require("@eryue/utils");

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const router = new _koaRouterMapping.default({
  rebindHandles
});

function rebindHandles(handles) {
  if ((0, _utils.getArgType)(handles).isFunction) {
    handles = [handles];
  }

  const newHandles = handles.map(handle => {
    return async (cx, next) => {
      const [eryueContext] = _injector.default.resolve(_contextNames.ERYUE_CONTEXT);

      const beInjected = _objectSpread({}, {
        next,
        context: cx
      }, eryueContext);

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