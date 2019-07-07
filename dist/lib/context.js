"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEryueContext;

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _resBody = _interopRequireDefault(require("../helper/resBody"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEryueContext(cx) {
  const [config, service, model] = _injector.default.resolve(_contextNames.CONFIG, _contextNames.SERVICE, _contextNames.MODEL);

  const helper = {
    success() {
      (0, _resBody.default)(true).apply(cx, arguments);
    },

    failed() {
      (0, _resBody.default)(false).apply(cx, arguments);
    }

  };
  const eryueContext = {
    config,
    service,
    model,
    helper
  };

  _injector.default.add(_contextNames.ERYUE_CONTEXT, eryueContext);
}