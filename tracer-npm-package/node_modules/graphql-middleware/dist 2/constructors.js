'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const generator = require('./generator.js');

function middleware(generator$1) {
  return new generator.MiddlewareGenerator(generator$1);
}

exports.middleware = middleware;
