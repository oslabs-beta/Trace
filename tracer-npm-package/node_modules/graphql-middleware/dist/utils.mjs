import { GraphQLObjectType, GraphQLInterfaceType } from 'graphql';
import { MiddlewareGenerator } from './generator.mjs';

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
  return x instanceof MiddlewareGenerator;
}
function isGraphQLObjectType(obj) {
  return obj instanceof GraphQLObjectType || obj instanceof GraphQLInterfaceType;
}

export { isGraphQLObjectType, isMiddlewareFunction, isMiddlewareGenerator, isMiddlewareResolver, isMiddlewareWithFragment };
