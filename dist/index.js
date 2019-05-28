"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _application = _interopRequireDefault(require("./lib/application"));

var _start = _interopRequireDefault(require("./lib/start"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Eryue extends _application.default {
  constructor() {
    super();
    return (0, _start.default)();
  }

  static start() {
    return new Eryue();
  }

} // class App extends Eryue {};
// new App();
// Eryue.start();


exports.default = Eryue;