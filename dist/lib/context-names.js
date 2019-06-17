"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVICE = exports.MIDDLEWARES = exports.CONFIG = void 0;
const CONFIG = Symbol('config');
exports.CONFIG = CONFIG;
const MIDDLEWARES = Symbol('middleares');
exports.MIDDLEWARES = MIDDLEWARES;
const SERVICE = Symbol('service');
exports.SERVICE = SERVICE;