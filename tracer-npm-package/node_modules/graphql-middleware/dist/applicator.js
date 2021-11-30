'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const graphql = require('graphql');
const utils = require('./utils.js');

function wrapResolverInMiddleware(resolver, middleware) {
  return (parent, args, ctx, info) => middleware((_parent = parent, _args = args, _ctx = ctx, _info = info) => resolver(_parent, _args, _ctx, _info), parent, args, ctx, info);
}
function parseField(field) {
  const { isDeprecated, ...restData } = field;
  const argsMap = field.args.reduce((acc, cur) => ({
    ...acc,
    [cur.name]: cur
  }), {});
  return {
    ...restData,
    args: argsMap
  };
}
function applyMiddlewareToField(field, options, middleware) {
  const parsedField = parseField(field);
  if (utils.isMiddlewareWithFragment(middleware) && parsedField.resolve && parsedField.resolve !== graphql.defaultFieldResolver) {
    return {
      ...parsedField,
      fragment: middleware.fragment,
      fragments: middleware.fragments,
      resolve: wrapResolverInMiddleware(parsedField.resolve, middleware.resolve)
    };
  } else if (utils.isMiddlewareWithFragment(middleware) && parsedField.subscribe) {
    return {
      ...parsedField,
      fragment: middleware.fragment,
      fragments: middleware.fragments,
      subscribe: wrapResolverInMiddleware(parsedField.subscribe, middleware.resolve)
    };
  } else if (utils.isMiddlewareResolver(middleware) && parsedField.resolve && parsedField.resolve !== graphql.defaultFieldResolver) {
    return {
      ...parsedField,
      resolve: wrapResolverInMiddleware(parsedField.resolve, middleware)
    };
  } else if (utils.isMiddlewareResolver(middleware) && parsedField.subscribe) {
    return {
      ...parsedField,
      subscribe: wrapResolverInMiddleware(parsedField.subscribe, middleware)
    };
  } else if (utils.isMiddlewareWithFragment(middleware) && !options.onlyDeclaredResolvers) {
    return {
      ...parsedField,
      fragment: middleware.fragment,
      fragments: middleware.fragments,
      resolve: wrapResolverInMiddleware(graphql.defaultFieldResolver, middleware.resolve)
    };
  } else if (utils.isMiddlewareResolver(middleware) && !options.onlyDeclaredResolvers) {
    return {
      ...parsedField,
      resolve: wrapResolverInMiddleware(graphql.defaultFieldResolver, middleware)
    };
  } else {
    return { ...parsedField, resolve: graphql.defaultFieldResolver };
  }
}
function applyMiddlewareToType(type, options, middleware) {
  const fieldMap = type.getFields();
  if (utils.isMiddlewareFunction(middleware)) {
    const resolvers = Object.keys(fieldMap).reduce((resolvers2, fieldName) => ({
      ...resolvers2,
      [fieldName]: applyMiddlewareToField(fieldMap[fieldName], options, middleware)
    }), {});
    return resolvers;
  } else {
    const resolvers = Object.keys(middleware).reduce((resolvers2, field) => ({
      ...resolvers2,
      [field]: applyMiddlewareToField(fieldMap[field], options, middleware[field])
    }), {});
    return resolvers;
  }
}
function applyMiddlewareToSchema(schema, options, middleware) {
  const typeMap = schema.getTypeMap();
  const resolvers = Object.keys(typeMap).filter((type) => utils.isGraphQLObjectType(typeMap[type]) && !graphql.isIntrospectionType(typeMap[type])).reduce((resolvers2, type) => ({
    ...resolvers2,
    [type]: applyMiddlewareToType(typeMap[type], options, middleware)
  }), {});
  return resolvers;
}
function generateResolverFromSchemaAndMiddleware(schema, options, middleware) {
  if (utils.isMiddlewareFunction(middleware)) {
    return applyMiddlewareToSchema(schema, options, middleware);
  } else {
    const typeMap = schema.getTypeMap();
    const resolvers = Object.keys(middleware).reduce((resolvers2, type) => ({
      ...resolvers2,
      [type]: applyMiddlewareToType(typeMap[type], options, middleware[type])
    }), {});
    return resolvers;
  }
}

exports.generateResolverFromSchemaAndMiddleware = generateResolverFromSchemaAndMiddleware;
