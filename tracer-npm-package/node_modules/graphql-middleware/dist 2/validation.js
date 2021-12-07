'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('./utils.js');

function validateMiddleware(schema, middleware) {
  if (utils.isMiddlewareFunction(middleware)) {
    return middleware;
  }
  const types = schema.getTypeMap();
  Object.keys(middleware).forEach((type) => {
    if (!Object.keys(types).includes(type)) {
      throw new MiddlewareError(`Type ${type} exists in middleware but is missing in Schema.`);
    }
    if (!utils.isMiddlewareFunction(middleware[type])) {
      const fields = types[type].getFields();
      Object.keys(middleware[type]).forEach((field) => {
        if (!Object.keys(fields).includes(field)) {
          throw new MiddlewareError(`Field ${type}.${field} exists in middleware but is missing in Schema.`);
        }
        if (!utils.isMiddlewareFunction(middleware[type][field])) {
          throw new MiddlewareError(`Expected ${type}.${field} to be a function but found ` + typeof middleware[type][field]);
        }
      });
    }
  });
  return middleware;
}
class MiddlewareError extends Error {
}

exports.MiddlewareError = MiddlewareError;
exports.validateMiddleware = validateMiddleware;
