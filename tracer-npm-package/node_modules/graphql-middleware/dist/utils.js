'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const graphql = require('graphql');
const generator = require('./generator.js');

function isMiddlewareResolver(obj) {
  return typeof obj === "function" || typeof obj === "object" && obj.then !== void 0;
}
function isMiddlewareWithFragment(obj) {
  return (typeof obj.fragment === "string" || typeof obj.fragments === "object") && isMiddlewareResolver(obj.resolve);
}
function isMiddlewareFunction(obj) {
  return isMiddlewareWithFragment(obj) || isMiddlewareResolver(obj);
}
function isMiddlewareGenerator(x) {
  return x instanceof generator.MiddlewareGenerator;
}
function isGraphQLObjectType(obj) {
  return obj instanceof graphql.GraphQLObjectType || obj instanceof graphql.GraphQLInterfaceType;
}

exports.isGraphQLObjectType = isGraphQLObjectType;
exports.isMiddlewareFunction = isMiddlewareFunction;
exports.isMiddlewareGenerator = isMiddlewareGenerator;
exports.isMiddlewareResolver = isMiddlewareResolver;
exports.isMiddlewareWithFragment = isMiddlewareWithFragment;
