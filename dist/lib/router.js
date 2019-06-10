"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadRoutes = loadRoutes;
exports.default = void 0;

var _koaRouterMapping = _interopRequireDefault(require("@eryue/koa-router-mapping"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouterMapping.default();
var _default = router;
exports.default = _default;

async function loadRoutes(cx, next) {
  const useRoutes = router.mapRoutes();
  await useRoutes.apply(cx, arguments);
}