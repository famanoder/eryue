"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _application = _interopRequireDefault(require("./application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start(callback) {
  const app = new _application.default();
  app.useAll();
  app.listen(1234, p => {
    console.log(p);
  });
  return app;
}

class Eryue {
  constructor() {
    return start();
  }

}

exports.default = Eryue;
;