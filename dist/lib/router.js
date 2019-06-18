"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rebindHandles = rebindHandles;
exports.loadRoutes = loadRoutes;
exports.default = void 0;

var _koaRouterMapping = _interopRequireDefault(require("@eryue/koa-router-mapping"));

var _utils = require("@eryue/utils");

var _koaCompose = _interopRequireDefault(require("koa-compose"));

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
      await handle.call(cx, {
        config: cx.config,
        context: cx,
        next,
        service: cx.service
      });
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