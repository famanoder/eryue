"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERYUE_CONTEXT = exports.BODY = exports.MODEL = exports.SERVICE = exports.MIDDLEWARES = exports.CONFIG = void 0;
const CONFIG = Symbol('config');
exports.CONFIG = CONFIG;
const MIDDLEWARES = Symbol('middleares');
exports.MIDDLEWARES = MIDDLEWARES;
const SERVICE = Symbol('service');
exports.SERVICE = SERVICE;
const MODEL = Symbol('model');
exports.MODEL = MODEL;
const BODY = Symbol('body');
exports.BODY = BODY;
const ERYUE_CONTEXT = Symbol('eryue_context');
exports.ERYUE_CONTEXT = ERYUE_CONTEXT;