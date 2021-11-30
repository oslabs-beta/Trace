'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class MiddlewareGenerator {
  constructor(generator) {
    this.generator = generator;
  }
  generate(schema) {
    return this.generator(schema);
  }
}

exports.MiddlewareGenerator = MiddlewareGenerator;
