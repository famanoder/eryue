"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _injector = _interopRequireDefault(require("@eryue/injector"));

var _resBody = _interopRequireDefault(require("../helper/resBody"));

var _contextNames = require("./context-names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  const cx = this.context;

  const [config, service] = _injector.default.resolve(_contextNames.CONFIG, _contextNames.SERVICE);

  const success = function () {
    (0, _resBody.default)(true).apply(cx, arguments);
  };

  const failed = function () {
    (0, _resBody.default)(false).apply(cx, arguments);
  };

  cx[_contextNames.ERYUE_CONFIG] = {
    config,
    service,
    success,
    failed
  };
}