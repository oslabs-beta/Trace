'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const graphql = require('graphql');
const utils = require('@graphql-tools/utils');
const valueOrPromise = require('value-or-promise');
const batchExecute = require('@graphql-tools/batch-execute');

function applySchemaTransforms(originalWrappingSchema, subschemaConfig, transformedSchema) {
    const schemaTransforms = subschemaConfig.transforms;
    if (schemaTransforms == null) {
        return originalWrappingSchema;
    }
    return schemaTransforms.reduce((schema, transform) => transform.transformSchema != null
        ? transform.transformSchema(schema, subschemaConfig, transformedSchema)
        : schema, originalWrappingSchema);
}

function isSubschema(value) {
    return Boolean(value.transformedSchema);
}
class Subschema {
    constructor(config) {
        var _a;
        this.schema = config.schema;
        this.executor = config.executor;
        this.batch = config.batch;
        this.batchingOptions = config.batchingOptions;
        this.createProxyingResolver = config.createProxyingResolver;
        this.transforms = (_a = config.transforms) !== null && _a !== void 0 ? _a : [];
        this.transformedSchema = applySchemaTransforms(this.schema, config);
        this.merge = config.merge;
    }
}

function getDocumentMetadata(document) {
    const operations = [];
    const fragments = [];
    const fragmentNames = new Set();
    for (let i = 0; i < document.definitions.length; i++) {
        const def = document.definitions[i];
        if (def.kind === graphql.Kind.FRAGMENT_DEFINITION) {
            fragments.push(def);
            fragmentNames.add(def.name.value);
        }
        else if (def.kind === graphql.Kind.OPERATION_DEFINITION) {
            operations.push(def);
        }
    }
    return {
        operations,
        fragments,
        fragmentNames,
    };
}

function prepareGatewayDocument(originalDocument, transformedSchema, returnType, infoSchema) {
    const wrappedConcreteTypesDocument = wrapConcreteTypes(returnType, transformedSchema, originalDocument);
    if (infoSchema == null) {
        return wrappedConcreteTypesDocument;
    }
    const { possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, fieldNodesByType, fieldNodesByField, dynamicSelectionSetsByField, } = getSchemaMetaData(infoSchema, transformedSchema);
    const { operations, fragments, fragmentNames } = getDocumentMetadata(wrappedConcreteTypesDocument);
    const { expandedFragments, fragmentReplacements } = getExpandedFragments(fragments, fragmentNames, possibleTypesMap);
    const typeInfo = new graphql.TypeInfo(transformedSchema);
    const expandedDocument = {
        kind: graphql.Kind.DOCUMENT,
        definitions: [...operations, ...fragments, ...expandedFragments],
    };
    const visitorKeyMap = {
        Document: ['definitions'],
        OperationDefinition: ['selectionSet'],
        SelectionSet: ['selections'],
        Field: ['selectionSet'],
        InlineFragment: ['selectionSet'],
        FragmentDefinition: ['selectionSet'],
    };
    return graphql.visit(expandedDocument, graphql.visitWithTypeInfo(typeInfo, {
        [graphql.Kind.SELECTION_SET]: node => visitSelectionSet(node, fragmentReplacements, transformedSchema, typeInfo, possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, fieldNodesByType, fieldNodesByField, dynamicSelectionSetsByField),
    }), 
    // visitorKeys argument usage a la https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
    // empty keys cannot be removed only because of typescript errors
    // will hopefully be fixed in future version of graphql-js to be optional
    visitorKeyMap);
}
function visitSelectionSet(node, fragmentReplacements, schema, typeInfo, possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, fieldNodesByType, fieldNodesByField, dynamicSelectionSetsByField) {
    var _a, _b;
    const newSelections = new Set();
    const maybeType = typeInfo.getParentType();
    if (maybeType != null) {
        const parentType = graphql.getNamedType(maybeType);
        const parentTypeName = parentType.name;
        const fieldNodes = fieldNodesByType[parentTypeName];
        if (fieldNodes) {
            for (const fieldNode of fieldNodes) {
                newSelections.add(fieldNode);
            }
        }
        const interfaceExtensions = interfaceExtensionsMap[parentType.name];
        const interfaceExtensionFields = [];
        for (const selection of node.selections) {
            if (selection.kind === graphql.Kind.INLINE_FRAGMENT) {
                if (selection.typeCondition != null) {
                    const possibleTypes = possibleTypesMap[selection.typeCondition.name.value];
                    if (possibleTypes == null) {
                        newSelections.add(selection);
                        continue;
                    }
                    for (const possibleTypeName of possibleTypes) {
                        const maybePossibleType = schema.getType(possibleTypeName);
                        if (maybePossibleType != null && utils.implementsAbstractType(schema, parentType, maybePossibleType)) {
                            newSelections.add(generateInlineFragment(possibleTypeName, selection.selectionSet));
                        }
                    }
                }
            }
            else if (selection.kind === graphql.Kind.FRAGMENT_SPREAD) {
                const fragmentName = selection.name.value;
                if (!fragmentReplacements[fragmentName]) {
                    newSelections.add(selection);
                    continue;
                }
                for (const replacement of fragmentReplacements[fragmentName]) {
                    const typeName = replacement.typeName;
                    const maybeReplacementType = schema.getType(typeName);
                    if (maybeReplacementType != null && utils.implementsAbstractType(schema, parentType, maybeType)) {
                        newSelections.add({
                            kind: graphql.Kind.FRAGMENT_SPREAD,
                            name: {
                                kind: graphql.Kind.NAME,
                                value: replacement.fragmentName,
                            },
                        });
                    }
                }
            }
            else {
                const fieldName = selection.name.value;
                const fieldNodes = (_a = fieldNodesByField[parentTypeName]) === null || _a === void 0 ? void 0 : _a[fieldName];
                if (fieldNodes != null) {
                    for (const fieldNode of fieldNodes) {
                        newSelections.add(fieldNode);
                    }
                }
                const dynamicSelectionSets = (_b = dynamicSelectionSetsByField[parentTypeName]) === null || _b === void 0 ? void 0 : _b[fieldName];
                if (dynamicSelectionSets != null) {
                    for (const selectionSetFn of dynamicSelectionSets) {
                        const selectionSet = selectionSetFn(selection);
                        if (selectionSet != null) {
                            for (const selection of selectionSet.selections) {
                                newSelections.add(selection);
                            }
                        }
                    }
                }
                if (interfaceExtensions === null || interfaceExtensions === void 0 ? void 0 : interfaceExtensions[fieldName]) {
                    interfaceExtensionFields.push(selection);
                }
                else {
                    newSelections.add(selection);
                }
            }
        }
        if (reversePossibleTypesMap[parentType.name]) {
            newSelections.add({
                kind: graphql.Kind.FIELD,
                name: {
                    kind: graphql.Kind.NAME,
                    value: '__typename',
                },
            });
        }
        if (interfaceExtensionFields.length) {
            const possibleTypes = possibleTypesMap[parentType.name];
            if (possibleTypes != null) {
                for (const possibleType of possibleTypes) {
                    newSelections.add(generateInlineFragment(possibleType, {
                        kind: graphql.Kind.SELECTION_SET,
                        selections: interfaceExtensionFields,
                    }));
                }
            }
        }
        return {
            ...node,
            selections: Array.from(newSelections),
        };
    }
    return node;
}
function generateInlineFragment(typeName, selectionSet) {
    return {
        kind: graphql.Kind.INLINE_FRAGMENT,
        typeCondition: {
            kind: graphql.Kind.NAMED_TYPE,
            name: {
                kind: graphql.Kind.NAME,
                value: typeName,
            },
        },
        selectionSet,
    };
}
const getSchemaMetaData = utils.memoize2((sourceSchema, targetSchema) => {
    var _a, _b, _c, _d;
    const typeMap = sourceSchema.getTypeMap();
    const targetTypeMap = targetSchema.getTypeMap();
    const possibleTypesMap = Object.create(null);
    const interfaceExtensionsMap = Object.create(null);
    for (const typeName in typeMap) {
        const type = typeMap[typeName];
        if (graphql.isAbstractType(type)) {
            const targetType = targetTypeMap[typeName];
            if (graphql.isInterfaceType(type) && graphql.isInterfaceType(targetType)) {
                const targetTypeFields = targetType.getFields();
                const sourceTypeFields = type.getFields();
                const extensionFields = Object.create(null);
                let isExtensionFieldsEmpty = true;
                for (const fieldName in sourceTypeFields) {
                    if (!targetTypeFields[fieldName]) {
                        extensionFields[fieldName] = true;
                        isExtensionFieldsEmpty = false;
                    }
                }
                if (!isExtensionFieldsEmpty) {
                    interfaceExtensionsMap[typeName] = extensionFields;
                }
            }
            if (interfaceExtensionsMap[typeName] || !graphql.isAbstractType(targetType)) {
                const implementations = sourceSchema.getPossibleTypes(type);
                possibleTypesMap[typeName] = [];
                for (const impl of implementations) {
                    if (targetTypeMap[impl.name]) {
                        possibleTypesMap[typeName].push(impl.name);
                    }
                }
            }
        }
    }
    const stitchingInfo = (_a = sourceSchema.extensions) === null || _a === void 0 ? void 0 : _a['stitchingInfo'];
    return {
        possibleTypesMap,
        reversePossibleTypesMap: reversePossibleTypesMap(possibleTypesMap),
        interfaceExtensionsMap,
        fieldNodesByType: (_b = stitchingInfo === null || stitchingInfo === void 0 ? void 0 : stitchingInfo.fieldNodesByType) !== null && _b !== void 0 ? _b : {},
        fieldNodesByField: (_c = stitchingInfo === null || stitchingInfo === void 0 ? void 0 : stitchingInfo.fieldNodesByField) !== null && _c !== void 0 ? _c : {},
        dynamicSelectionSetsByField: (_d = stitchingInfo === null || stitchingInfo === void 0 ? void 0 : stitchingInfo.dynamicSelectionSetsByField) !== null && _d !== void 0 ? _d : {},
    };
});
function reversePossibleTypesMap(possibleTypesMap) {
    const result = Object.create(null);
    for (const typeName in possibleTypesMap) {
        const toTypeNames = possibleTypesMap[typeName];
        for (const toTypeName of toTypeNames) {
            if (!result[toTypeName]) {
                result[toTypeName] = [];
            }
            result[toTypeName].push(typeName);
        }
    }
    return result;
}
function getExpandedFragments(fragments, fragmentNames, possibleTypesMap) {
    let fragmentCounter = 0;
    function generateFragmentName(typeName) {
        let fragmentName;
        do {
            fragmentName = `_${typeName}_Fragment${fragmentCounter.toString()}`;
            fragmentCounter++;
        } while (fragmentNames.has(fragmentName));
        return fragmentName;
    }
    const expandedFragments = [];
    const fragmentReplacements = Object.create(null);
    for (const fragment of fragments) {
        const possibleTypes = possibleTypesMap[fragment.typeCondition.name.value];
        if (possibleTypes != null) {
            const fragmentName = fragment.name.value;
            fragmentReplacements[fragmentName] = [];
            for (const possibleTypeName of possibleTypes) {
                const name = generateFragmentName(possibleTypeName);
                fragmentNames.add(name);
                expandedFragments.push({
                    kind: graphql.Kind.FRAGMENT_DEFINITION,
                    name: {
                        kind: graphql.Kind.NAME,
                        value: name,
                    },
                    typeCondition: {
                        kind: graphql.Kind.NAMED_TYPE,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: possibleTypeName,
                        },
                    },
                    selectionSet: fragment.selectionSet,
                });
                fragmentReplacements[fragmentName].push({
                    fragmentName: name,
                    typeName: possibleTypeName,
                });
            }
        }
    }
    return {
        expandedFragments,
        fragmentReplacements,
    };
}
function wrapConcreteTypes(returnType, targetSchema, document) {
    const namedType = graphql.getNamedType(returnType);
    if (!graphql.isObjectType(namedType)) {
        return document;
    }
    const rootTypeNames = utils.getRootTypeNames(targetSchema);
    const typeInfo = new graphql.TypeInfo(targetSchema);
    const visitorKeys = {
        Document: ['definitions'],
        OperationDefinition: ['selectionSet'],
        SelectionSet: ['selections'],
        InlineFragment: ['selectionSet'],
        FragmentDefinition: ['selectionSet'],
    };
    return graphql.visit(document, graphql.visitWithTypeInfo(typeInfo, {
        [graphql.Kind.FRAGMENT_DEFINITION]: (node) => {
            const typeName = node.typeCondition.name.value;
            if (!rootTypeNames.has(typeName)) {
                return false;
            }
        },
        [graphql.Kind.FIELD]: (node) => {
            const type = typeInfo.getType();
            if (type != null && graphql.isAbstractType(graphql.getNamedType(type))) {
                return {
                    ...node,
                    selectionSet: {
                        kind: graphql.Kind.SELECTION_SET,
                        selections: [
                            {
                                kind: graphql.Kind.INLINE_FRAGMENT,
                                typeCondition: {
                                    kind: graphql.Kind.NAMED_TYPE,
                                    name: {
                                        kind: graphql.Kind.NAME,
                                        value: namedType.name,
                                    },
                                },
                                selectionSet: node.selectionSet,
                            },
                        ],
                    },
                };
            }
        },
    }), 
    // visitorKeys argument usage a la https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
    // empty keys cannot be removed only because of typescript errors
    // will hopefully be fixed in future version of graphql-js to be optional
    visitorKeys);
}

function finalizeGatewayDocument(targetSchema, fragments, operations) {
    var _a;
    let usedVariables = [];
    let usedFragments = [];
    const newOperations = [];
    let newFragments = [];
    const validFragments = [];
    const validFragmentsWithType = Object.create(null);
    for (const fragment of fragments) {
        const typeName = fragment.typeCondition.name.value;
        const type = targetSchema.getType(typeName);
        if (type != null) {
            validFragments.push(fragment);
            validFragmentsWithType[fragment.name.value] = type;
        }
    }
    let fragmentSet = Object.create(null);
    for (const operation of operations) {
        const type = utils.getDefinedRootType(targetSchema, operation.operation);
        const { selectionSet, usedFragments: operationUsedFragments, usedVariables: operationUsedVariables, } = finalizeSelectionSet(targetSchema, type, validFragmentsWithType, operation.selectionSet);
        usedFragments = union(usedFragments, operationUsedFragments);
        const { usedVariables: collectedUsedVariables, newFragments: collectedNewFragments, fragmentSet: collectedFragmentSet, } = collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments);
        const operationOrFragmentVariables = union(operationUsedVariables, collectedUsedVariables);
        usedVariables = union(usedVariables, operationOrFragmentVariables);
        newFragments = collectedNewFragments;
        fragmentSet = collectedFragmentSet;
        const variableDefinitions = ((_a = operation.variableDefinitions) !== null && _a !== void 0 ? _a : []).filter((variable) => operationOrFragmentVariables.indexOf(variable.variable.name.value) !== -1);
        newOperations.push({
            kind: graphql.Kind.OPERATION_DEFINITION,
            operation: operation.operation,
            name: operation.name,
            directives: operation.directives,
            variableDefinitions,
            selectionSet,
        });
    }
    const newDocument = {
        kind: graphql.Kind.DOCUMENT,
        definitions: [...newOperations, ...newFragments],
    };
    return {
        usedVariables,
        newDocument,
    };
}
function finalizeGatewayRequest(originalRequest, delegationContext) {
    let { document, variables } = originalRequest;
    let { operations, fragments } = getDocumentMetadata(document);
    const { targetSchema, args } = delegationContext;
    if (args) {
        const requestWithNewVariables = addVariablesToRootFields(targetSchema, operations, args);
        operations = requestWithNewVariables.newOperations;
        variables = Object.assign({}, variables !== null && variables !== void 0 ? variables : {}, requestWithNewVariables.newVariables);
    }
    const { usedVariables, newDocument } = finalizeGatewayDocument(targetSchema, fragments, operations);
    const newVariables = {};
    if (variables != null) {
        for (const variableName of usedVariables) {
            const variableValue = variables[variableName];
            if (variableValue !== undefined) {
                newVariables[variableName] = variableValue;
            }
        }
    }
    return {
        ...originalRequest,
        document: newDocument,
        variables: newVariables,
    };
}
function addVariablesToRootFields(targetSchema, operations, args) {
    const newVariables = Object.create(null);
    const newOperations = operations.map((operation) => {
        var _a, _b;
        const variableDefinitionMap = ((_a = operation.variableDefinitions) !== null && _a !== void 0 ? _a : []).reduce((prev, def) => ({
            ...prev,
            [def.variable.name.value]: def,
        }), {});
        const type = utils.getDefinedRootType(targetSchema, operation.operation);
        const newSelections = [];
        for (const selection of operation.selectionSet.selections) {
            if (selection.kind === graphql.Kind.FIELD) {
                const argumentNodes = (_b = selection.arguments) !== null && _b !== void 0 ? _b : [];
                const argumentNodeMap = argumentNodes.reduce((prev, argument) => ({
                    ...prev,
                    [argument.name.value]: argument,
                }), {});
                const targetField = type.getFields()[selection.name.value];
                // excludes __typename
                if (targetField != null) {
                    updateArguments(targetField, argumentNodeMap, variableDefinitionMap, newVariables, args);
                }
                newSelections.push({
                    ...selection,
                    arguments: Object.values(argumentNodeMap),
                });
            }
            else {
                newSelections.push(selection);
            }
        }
        const newSelectionSet = {
            kind: graphql.Kind.SELECTION_SET,
            selections: newSelections,
        };
        return {
            ...operation,
            variableDefinitions: Object.values(variableDefinitionMap),
            selectionSet: newSelectionSet,
        };
    });
    return {
        newOperations,
        newVariables,
    };
}
function updateArguments(targetField, argumentNodeMap, variableDefinitionMap, variableValues, newArgs) {
    const generateVariableName = utils.createVariableNameGenerator(variableDefinitionMap);
    for (const argument of targetField.args) {
        const argName = argument.name;
        const argType = argument.type;
        if (argName in newArgs) {
            utils.updateArgument(argumentNodeMap, variableDefinitionMap, variableValues, argName, generateVariableName(argName), argType, utils.serializeInputValue(argType, newArgs[argName]));
        }
    }
}
function collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments) {
    let remainingFragments = usedFragments.slice();
    let usedVariables = [];
    const newFragments = [];
    while (remainingFragments.length !== 0) {
        const nextFragmentName = remainingFragments.pop();
        const fragment = validFragments.find(fr => fr.name.value === nextFragmentName);
        if (fragment != null) {
            const name = nextFragmentName;
            const typeName = fragment.typeCondition.name.value;
            const type = targetSchema.getType(typeName);
            if (type == null) {
                throw new Error(`Fragment reference type "${typeName}", but the type is not contained within the target schema.`);
            }
            const { selectionSet, usedFragments: fragmentUsedFragments, usedVariables: fragmentUsedVariables, } = finalizeSelectionSet(targetSchema, type, validFragmentsWithType, fragment.selectionSet);
            remainingFragments = union(remainingFragments, fragmentUsedFragments);
            usedVariables = union(usedVariables, fragmentUsedVariables);
            if (name && !(name in fragmentSet)) {
                fragmentSet[name] = true;
                newFragments.push({
                    kind: graphql.Kind.FRAGMENT_DEFINITION,
                    name: {
                        kind: graphql.Kind.NAME,
                        value: name,
                    },
                    typeCondition: fragment.typeCondition,
                    selectionSet,
                });
            }
        }
    }
    return {
        usedVariables,
        newFragments,
        fragmentSet,
    };
}
const filteredSelectionSetVisitorKeys = {
    SelectionSet: ['selections'],
    Field: ['selectionSet'],
    InlineFragment: ['selectionSet'],
    FragmentDefinition: ['selectionSet'],
};
const variablesVisitorKeys = {
    SelectionSet: ['selections'],
    Field: ['arguments', 'directives', 'selectionSet'],
    Argument: ['value'],
    InlineFragment: ['directives', 'selectionSet'],
    FragmentSpread: ['directives'],
    FragmentDefinition: ['selectionSet'],
    ObjectValue: ['fields'],
    ObjectField: ['name', 'value'],
    Directive: ['arguments'],
    ListValue: ['values'],
};
function finalizeSelectionSet(schema, type, validFragments, selectionSet) {
    const usedFragments = [];
    const usedVariables = [];
    const typeInfo = graphql.versionInfo.major < 16 ? new graphql.TypeInfo(schema, undefined, type) : new graphql.TypeInfo(schema, type);
    const filteredSelectionSet = graphql.visit(selectionSet, graphql.visitWithTypeInfo(typeInfo, {
        [graphql.Kind.FIELD]: {
            enter: node => {
                const parentType = typeInfo.getParentType();
                if (graphql.isObjectType(parentType) || graphql.isInterfaceType(parentType)) {
                    const fields = parentType.getFields();
                    const field = node.name.value === '__typename' ? graphql.TypeNameMetaFieldDef : fields[node.name.value];
                    if (!field) {
                        return null;
                    }
                    const args = field.args != null ? field.args : [];
                    const argsMap = Object.create(null);
                    for (const arg of args) {
                        argsMap[arg.name] = arg;
                    }
                    if (node.arguments != null) {
                        const newArgs = [];
                        for (const arg of node.arguments) {
                            if (arg.name.value in argsMap) {
                                newArgs.push(arg);
                            }
                        }
                        if (newArgs.length !== node.arguments.length) {
                            return {
                                ...node,
                                arguments: newArgs,
                            };
                        }
                    }
                }
            },
            leave: node => {
                const type = typeInfo.getType();
                if (type == null) {
                    throw new Error(`No type was found for field node ${utils.inspect(node)}.`);
                }
                const namedType = graphql.getNamedType(type);
                if (!schema.getType(namedType.name) == null) {
                    return null;
                }
                if (graphql.isObjectType(namedType) || graphql.isInterfaceType(namedType)) {
                    const selections = node.selectionSet != null ? node.selectionSet.selections : null;
                    if (selections == null || selections.length === 0) {
                        return null;
                    }
                }
            },
        },
        [graphql.Kind.FRAGMENT_SPREAD]: {
            enter: node => {
                if (!(node.name.value in validFragments)) {
                    return null;
                }
                const parentType = typeInfo.getParentType();
                const innerType = validFragments[node.name.value];
                if (!utils.implementsAbstractType(schema, parentType, innerType)) {
                    return null;
                }
                usedFragments.push(node.name.value);
            },
        },
        [graphql.Kind.INLINE_FRAGMENT]: {
            enter: node => {
                if (node.typeCondition != null) {
                    const parentType = typeInfo.getParentType();
                    const innerType = schema.getType(node.typeCondition.name.value);
                    if (!utils.implementsAbstractType(schema, parentType, innerType)) {
                        return null;
                    }
                }
            },
        },
        [graphql.Kind.SELECTION_SET]: {
            leave: node => {
                const parentType = typeInfo.getParentType();
                if (parentType != null && graphql.isAbstractType(parentType)) {
                    const selections = node.selections.concat([
                        {
                            kind: graphql.Kind.FIELD,
                            name: {
                                kind: graphql.Kind.NAME,
                                value: '__typename',
                            },
                        },
                    ]);
                    return {
                        ...node,
                        selections,
                    };
                }
            },
        },
    }), 
    // visitorKeys argument usage a la https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
    // empty keys cannot be removed only because of typescript errors
    // will hopefully be fixed in future version of graphql-js to be optional
    filteredSelectionSetVisitorKeys);
    graphql.visit(filteredSelectionSet, {
        [graphql.Kind.VARIABLE]: variableNode => {
            usedVariables.push(variableNode.name.value);
        },
    }, 
    // visitorKeys argument usage a la https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
    // empty keys cannot be removed only because of typescript errors
    // will hopefully be fixed in future version of graphql-js to be optional
    variablesVisitorKeys);
    return {
        selectionSet: filteredSelectionSet,
        usedFragments,
        usedVariables,
    };
}
function union(...arrays) {
    const cache = Object.create(null);
    const result = [];
    for (const array of arrays) {
        for (const item of array) {
            if (!(item in cache)) {
                cache[item] = true;
                result.push(item);
            }
        }
    }
    return result;
}

const UNPATHED_ERRORS_SYMBOL = Symbol('subschemaErrors');
const OBJECT_SUBSCHEMA_SYMBOL = Symbol('initialSubschema');
const FIELD_SUBSCHEMA_MAP_SYMBOL = Symbol('subschemaMap');

function isExternalObject(data) {
    return data[UNPATHED_ERRORS_SYMBOL] !== undefined;
}
function annotateExternalObject(object, errors, subschema, subschemaMap) {
    Object.defineProperties(object, {
        [OBJECT_SUBSCHEMA_SYMBOL]: { value: subschema },
        [FIELD_SUBSCHEMA_MAP_SYMBOL]: { value: subschemaMap },
        [UNPATHED_ERRORS_SYMBOL]: { value: errors },
    });
    return object;
}
function getSubschema(object, responseKey) {
    var _a;
    return (_a = object[FIELD_SUBSCHEMA_MAP_SYMBOL][responseKey]) !== null && _a !== void 0 ? _a : object[OBJECT_SUBSCHEMA_SYMBOL];
}
function getUnpathedErrors(object) {
    return object[UNPATHED_ERRORS_SYMBOL];
}
const EMPTY_ARRAY = [];
const EMPTY_OBJECT = Object.create(null);
async function mergeFields(mergedTypeInfo, object, sourceSubschema, context, info) {
    var _a;
    const delegationMaps = mergedTypeInfo.delegationPlanBuilder(info.schema, sourceSubschema, info.variableValues != null && Object.keys(info.variableValues).length > 0 ? info.variableValues : EMPTY_OBJECT, info.fragments != null && Object.keys(info.fragments).length > 0 ? info.fragments : EMPTY_OBJECT, ((_a = info.fieldNodes) === null || _a === void 0 ? void 0 : _a.length) ? info.fieldNodes : EMPTY_ARRAY);
    for (const delegationMap of delegationMaps) {
        await executeDelegationStage(mergedTypeInfo, delegationMap, object, context, info);
    }
    return object;
}
async function executeDelegationStage(mergedTypeInfo, delegationMap, object, context, info) {
    const combinedErrors = object[UNPATHED_ERRORS_SYMBOL];
    const path = graphql.responsePathAsArray(info.path);
    const combinedFieldSubschemaMap = object[FIELD_SUBSCHEMA_MAP_SYMBOL];
    const type = info.schema.getType(object.__typename);
    await Promise.all([...delegationMap.entries()].map(async ([s, selectionSet]) => {
        var _a;
        const resolver = mergedTypeInfo.resolvers.get(s);
        if (resolver) {
            let source;
            try {
                source = await resolver(object, context, info, s, selectionSet);
            }
            catch (error) {
                source = error;
            }
            if (source instanceof Error || source == null) {
                const fieldNodeResponseKeyMap = utils.collectFields(info.schema, {}, {}, type, selectionSet, new Map(), new Set());
                const nullResult = {};
                for (const [responseKey, fieldNodes] of fieldNodeResponseKeyMap) {
                    const combinedPath = [...path, responseKey];
                    if (source instanceof graphql.GraphQLError) {
                        nullResult[responseKey] = utils.relocatedError(source, combinedPath);
                    }
                    else if (source instanceof Error) {
                        nullResult[responseKey] = graphql.locatedError(source, fieldNodes, combinedPath);
                    }
                    else {
                        nullResult[responseKey] = null;
                    }
                }
                source = nullResult;
            }
            else {
                if (source[UNPATHED_ERRORS_SYMBOL]) {
                    combinedErrors.push(...source[UNPATHED_ERRORS_SYMBOL]);
                }
            }
            const objectSubschema = source[OBJECT_SUBSCHEMA_SYMBOL];
            const fieldSubschemaMap = source[FIELD_SUBSCHEMA_MAP_SYMBOL];
            for (const responseKey in source) {
                object[responseKey] = source[responseKey];
                combinedFieldSubschemaMap[responseKey] = (_a = fieldSubschemaMap === null || fieldSubschemaMap === void 0 ? void 0 : fieldSubschemaMap[responseKey]) !== null && _a !== void 0 ? _a : objectSubschema;
            }
        }
    }));
}

function resolveExternalValue(result, unpathedErrors, subschema, context, info, returnType = getReturnType(info), skipTypeMerging) {
    const type = graphql.getNullableType(returnType);
    if (result instanceof Error) {
        return result;
    }
    if (result == null) {
        return reportUnpathedErrorsViaNull(unpathedErrors);
    }
    if ('parseValue' in type) {
        return type.parseValue(result);
    }
    else if (graphql.isCompositeType(type)) {
        return resolveExternalObject(type, result, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
    else if (graphql.isListType(type)) {
        return resolveExternalList(type, result, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
}
function resolveExternalObject(type, object, unpathedErrors, subschema, context, info, skipTypeMerging) {
    var _a;
    // if we have already resolved this object, for example, when the identical object appears twice
    // in a list, see https://github.com/ardatan/graphql-tools/issues/2304
    if (!isExternalObject(object)) {
        annotateExternalObject(object, unpathedErrors, subschema, Object.create(null));
    }
    if (skipTypeMerging || info == null) {
        return object;
    }
    const stitchingInfo = (_a = info.schema.extensions) === null || _a === void 0 ? void 0 : _a['stitchingInfo'];
    if (stitchingInfo == null) {
        return object;
    }
    let typeName;
    if (graphql.isAbstractType(type)) {
        const resolvedType = info.schema.getType(object.__typename);
        if (resolvedType == null) {
            throw new Error(`Unable to resolve type '${object.__typename}'. Did you forget to include a transform that renames types? Did you delegate to the original subschema rather that the subschema config object containing the transform?`);
        }
        typeName = resolvedType.name;
    }
    else {
        typeName = type.name;
    }
    const mergedTypeInfo = stitchingInfo.mergedTypes[typeName];
    let targetSubschemas;
    // Within the stitching context, delegation to a stitched GraphQLSchema or SubschemaConfig
    // will be redirected to the appropriate Subschema object, from which merge targets can be queried.
    if (mergedTypeInfo != null) {
        targetSubschemas = mergedTypeInfo.targetSubschemas.get(subschema);
    }
    // If there are no merge targets from the subschema, return.
    if (!targetSubschemas || !targetSubschemas.length) {
        return object;
    }
    return mergeFields(mergedTypeInfo, object, subschema, context, info);
}
function resolveExternalList(type, list, unpathedErrors, subschema, context, info, skipTypeMerging) {
    return list.map(listMember => resolveExternalListMember(graphql.getNullableType(type.ofType), listMember, unpathedErrors, subschema, context, info, skipTypeMerging));
}
function resolveExternalListMember(type, listMember, unpathedErrors, subschema, context, info, skipTypeMerging) {
    if (listMember instanceof Error) {
        return listMember;
    }
    if (listMember == null) {
        return reportUnpathedErrorsViaNull(unpathedErrors);
    }
    if ('parseValue' in type) {
        return type.parseValue(listMember);
    }
    else if (graphql.isCompositeType(type)) {
        return resolveExternalObject(type, listMember, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
    else if (graphql.isListType(type)) {
        return resolveExternalList(type, listMember, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
}
const reportedErrors = new WeakMap();
function reportUnpathedErrorsViaNull(unpathedErrors) {
    if (unpathedErrors.length) {
        const unreportedErrors = [];
        for (const error of unpathedErrors) {
            if (!reportedErrors.has(error)) {
                unreportedErrors.push(error);
                reportedErrors.set(error, true);
            }
        }
        if (unreportedErrors.length) {
            if (unreportedErrors.length === 1) {
                return unreportedErrors[0];
            }
            const combinedError = new utils.AggregateError(unreportedErrors, unreportedErrors.map(error => error.message).join(', \n'));
            // We cast path as any for GraphQL.js 14 compat
            // locatedError path argument must be defined, but it is just forwarded to a constructor that allows a undefined value
            // https://github.com/graphql/graphql-js/blob/b4bff0ba9c15c9d7245dd68556e754c41f263289/src/error/locatedError.js#L25
            // https://github.com/graphql/graphql-js/blob/b4bff0ba9c15c9d7245dd68556e754c41f263289/src/error/GraphQLError.js#L19
            return graphql.locatedError(combinedError, undefined, unreportedErrors[0].path);
        }
    }
    return null;
}
function getReturnType(info) {
    if (info == null) {
        throw new Error(`Return type cannot be inferred without a source schema.`);
    }
    return info.returnType;
}

function checkResultAndHandleErrors(result, delegationContext) {
    const { context, info, fieldName: responseKey = getResponseKey(info), subschema, returnType = getReturnType$1(info), skipTypeMerging, onLocatedError, } = delegationContext;
    const { data, unpathedErrors } = mergeDataAndErrors(result.data == null ? undefined : result.data[responseKey], result.errors == null ? [] : result.errors, info != null && info.path ? graphql.responsePathAsArray(info.path) : undefined, onLocatedError);
    return resolveExternalValue(data, unpathedErrors, subschema, context, info, returnType, skipTypeMerging);
}
function mergeDataAndErrors(data, errors, path, onLocatedError, index = 1) {
    var _a;
    if (data == null) {
        if (!errors.length) {
            return { data: null, unpathedErrors: [] };
        }
        if (errors.length === 1) {
            const error = onLocatedError ? onLocatedError(errors[0]) : errors[0];
            const newPath = path === undefined ? error.path : error.path === undefined ? path : path.concat(error.path.slice(1));
            return { data: utils.relocatedError(errors[0], newPath), unpathedErrors: [] };
        }
        // We cast path as any for GraphQL.js 14 compat
        // locatedError path argument must be defined, but it is just forwarded to a constructor that allows a undefined value
        // https://github.com/graphql/graphql-js/blob/b4bff0ba9c15c9d7245dd68556e754c41f263289/src/error/locatedError.js#L25
        // https://github.com/graphql/graphql-js/blob/b4bff0ba9c15c9d7245dd68556e754c41f263289/src/error/GraphQLError.js#L19
        const combinedError = new utils.AggregateError(errors, errors.map(error => error.message).join(', \n'));
        const newError = graphql.locatedError(combinedError, undefined, path);
        return { data: newError, unpathedErrors: [] };
    }
    if (!errors.length) {
        return { data, unpathedErrors: [] };
    }
    const unpathedErrors = [];
    const errorMap = new Map();
    for (const error of errors) {
        const pathSegment = (_a = error.path) === null || _a === void 0 ? void 0 : _a[index];
        if (pathSegment != null) {
            let pathSegmentErrors = errorMap.get(pathSegment);
            if (pathSegmentErrors === undefined) {
                pathSegmentErrors = [error];
                errorMap.set(pathSegment, pathSegmentErrors);
            }
            else {
                pathSegmentErrors.push(error);
            }
        }
        else {
            unpathedErrors.push(error);
        }
    }
    for (const [pathSegment, pathSegmentErrors] of errorMap) {
        if (data[pathSegment] !== undefined) {
            const { data: newData, unpathedErrors: newErrors } = mergeDataAndErrors(data[pathSegment], pathSegmentErrors, path, onLocatedError, index + 1);
            data[pathSegment] = newData;
            unpathedErrors.push(...newErrors);
        }
        else {
            unpathedErrors.push(...pathSegmentErrors);
        }
    }
    return { data, unpathedErrors };
}
function getResponseKey(info) {
    if (info == null) {
        throw new Error(`Data cannot be extracted from result without an explicit key or source schema.`);
    }
    return utils.getResponseKeyFromInfo(info);
}
function getReturnType$1(info) {
    if (info == null) {
        throw new Error(`Return type cannot be inferred without a source schema.`);
    }
    return info.returnType;
}

class Transformer {
    constructor(context) {
        this.transformations = [];
        this.delegationContext = context;
        const transforms = context.transforms;
        const delegationTransforms = transforms.slice().reverse();
        for (const transform of delegationTransforms) {
            this.addTransform(transform, {});
        }
    }
    addTransform(transform, context = {}) {
        this.transformations.push({ transform, context });
    }
    transformRequest(originalRequest) {
        var _a;
        let request = {
            ...originalRequest,
            document: prepareGatewayDocument(originalRequest.document, this.delegationContext.transformedSchema, this.delegationContext.returnType, (_a = this.delegationContext.info) === null || _a === void 0 ? void 0 : _a.schema),
        };
        for (const transformation of this.transformations) {
            if (transformation.transform.transformRequest) {
                request = transformation.transform.transformRequest(request, this.delegationContext, transformation.context);
            }
        }
        return finalizeGatewayRequest(request, this.delegationContext);
    }
    transformResult(originalResult) {
        let result = originalResult;
        // from rigth to left
        for (let i = this.transformations.length - 1; i >= 0; i--) {
            const transformation = this.transformations[i];
            if (transformation.transform.transformResult) {
                result = transformation.transform.transformResult(result, this.delegationContext, transformation.context);
            }
        }
        return checkResultAndHandleErrors(result, this.delegationContext);
    }
}

function getDelegatingOperation(parentType, schema) {
    if (parentType === schema.getMutationType()) {
        return 'mutation';
    }
    else if (parentType === schema.getSubscriptionType()) {
        return 'subscription';
    }
    return 'query';
}
function createRequestFromInfo({ info, rootValue, operationName, operation = getDelegatingOperation(info.parentType, info.schema), fieldName = info.fieldName, selectionSet, fieldNodes = info.fieldNodes, context, }) {
    return createRequest({
        sourceSchema: info.schema,
        sourceParentType: info.parentType,
        sourceFieldName: info.fieldName,
        fragments: info.fragments,
        variableDefinitions: info.operation.variableDefinitions,
        variableValues: info.variableValues,
        targetRootValue: rootValue,
        targetOperationName: operationName,
        targetOperation: operation,
        targetFieldName: fieldName,
        selectionSet,
        fieldNodes,
        context,
        info,
    });
}
function createRequest({ sourceSchema, sourceParentType, sourceFieldName, fragments, variableDefinitions, variableValues, targetRootValue, targetOperationName, targetOperation, targetFieldName, selectionSet, fieldNodes, context, info, }) {
    var _a, _b;
    let newSelectionSet;
    const argumentNodeMap = Object.create(null);
    if (selectionSet != null) {
        newSelectionSet = selectionSet;
    }
    else {
        const selections = [];
        for (const fieldNode of fieldNodes || []) {
            if (fieldNode.selectionSet) {
                for (const selection of fieldNode.selectionSet.selections) {
                    selections.push(selection);
                }
            }
        }
        newSelectionSet = selections.length
            ? {
                kind: graphql.Kind.SELECTION_SET,
                selections,
            }
            : undefined;
        const args = (_a = fieldNodes === null || fieldNodes === void 0 ? void 0 : fieldNodes[0]) === null || _a === void 0 ? void 0 : _a.arguments;
        if (args) {
            for (const argNode of args) {
                argumentNodeMap[argNode.name.value] = argNode;
            }
        }
    }
    const newVariables = Object.create(null);
    const variableDefinitionMap = Object.create(null);
    if (sourceSchema != null && variableDefinitions != null) {
        for (const def of variableDefinitions) {
            const varName = def.variable.name.value;
            variableDefinitionMap[varName] = def;
            const varType = graphql.typeFromAST(sourceSchema, def.type);
            const serializedValue = utils.serializeInputValue(varType, variableValues === null || variableValues === void 0 ? void 0 : variableValues[varName]);
            if (serializedValue !== undefined) {
                newVariables[varName] = serializedValue;
            }
        }
    }
    if (sourceParentType != null && sourceFieldName != null) {
        updateArgumentsWithDefaults(sourceParentType, sourceFieldName, argumentNodeMap, variableDefinitionMap, newVariables);
    }
    const rootFieldName = targetFieldName !== null && targetFieldName !== void 0 ? targetFieldName : (_b = fieldNodes === null || fieldNodes === void 0 ? void 0 : fieldNodes[0]) === null || _b === void 0 ? void 0 : _b.name.value;
    if (rootFieldName === undefined) {
        throw new Error(`Either "targetFieldName" or a non empty "fieldNodes" array must be provided.`);
    }
    const rootfieldNode = {
        kind: graphql.Kind.FIELD,
        arguments: Object.values(argumentNodeMap),
        name: {
            kind: graphql.Kind.NAME,
            value: rootFieldName,
        },
        selectionSet: newSelectionSet,
    };
    const operationName = targetOperationName
        ? {
            kind: graphql.Kind.NAME,
            value: targetOperationName,
        }
        : undefined;
    const operationDefinition = {
        kind: graphql.Kind.OPERATION_DEFINITION,
        name: operationName,
        operation: targetOperation,
        variableDefinitions: Object.values(variableDefinitionMap),
        selectionSet: {
            kind: graphql.Kind.SELECTION_SET,
            selections: [rootfieldNode],
        },
    };
    const definitions = [operationDefinition];
    if (fragments != null) {
        for (const fragmentName in fragments) {
            const fragment = fragments[fragmentName];
            definitions.push(fragment);
        }
    }
    const document = {
        kind: graphql.Kind.DOCUMENT,
        definitions,
    };
    return {
        document,
        variables: newVariables,
        rootValue: targetRootValue,
        operationName: targetOperationName,
        context,
        info,
        operationType: targetOperation,
    };
}
function updateArgumentsWithDefaults(sourceParentType, sourceFieldName, argumentNodeMap, variableDefinitionMap, variableValues) {
    const generateVariableName = utils.createVariableNameGenerator(variableDefinitionMap);
    const sourceField = sourceParentType.getFields()[sourceFieldName];
    for (const argument of sourceField.args) {
        const argName = argument.name;
        const sourceArgType = argument.type;
        if (argumentNodeMap[argName] === undefined) {
            const defaultValue = argument.defaultValue;
            if (defaultValue !== undefined) {
                utils.updateArgument(argumentNodeMap, variableDefinitionMap, variableValues, argName, generateVariableName(argName), sourceArgType, utils.serializeInputValue(sourceArgType, defaultValue));
            }
        }
    }
}

/**
 * Resolver that knows how to:
 * a) handle aliases for proxied schemas
 * b) handle errors from proxied schemas
 * c) handle external to internal enum conversion
 */
function defaultMergedResolver(parent, args, context, info) {
    if (!parent) {
        return null;
    }
    const responseKey = utils.getResponseKeyFromInfo(info);
    // check to see if parent is not a proxied result, i.e. if parent resolver was manually overwritten
    // See https://github.com/ardatan/graphql-tools/issues/967
    if (!isExternalObject(parent)) {
        return graphql.defaultFieldResolver(parent, args, context, info);
    }
    const data = parent[responseKey];
    const unpathedErrors = getUnpathedErrors(parent);
    const subschema = getSubschema(parent, responseKey);
    return resolveExternalValue(data, unpathedErrors, subschema, context, info);
}

function isSubschemaConfig(value) {
    return Boolean(value === null || value === void 0 ? void 0 : value.schema);
}
function cloneSubschemaConfig(subschemaConfig) {
    var _a, _b;
    const newSubschemaConfig = {
        ...subschemaConfig,
        transforms: subschemaConfig.transforms != null ? [...subschemaConfig.transforms] : undefined,
    };
    if (newSubschemaConfig.merge != null) {
        newSubschemaConfig.merge = { ...subschemaConfig.merge };
        for (const typeName in newSubschemaConfig.merge) {
            const mergedTypeConfig = (newSubschemaConfig.merge[typeName] = { ...((_b = (_a = subschemaConfig.merge) === null || _a === void 0 ? void 0 : _a[typeName]) !== null && _b !== void 0 ? _b : {}) });
            if (mergedTypeConfig.entryPoints != null) {
                mergedTypeConfig.entryPoints = mergedTypeConfig.entryPoints.map(entryPoint => ({ ...entryPoint }));
            }
            if (mergedTypeConfig.fields != null) {
                const fields = (mergedTypeConfig.fields = { ...mergedTypeConfig.fields });
                for (const fieldName in fields) {
                    fields[fieldName] = { ...fields[fieldName] };
                }
            }
        }
    }
    return newSubschemaConfig;
}

function delegateToSchema(options) {
    const { info, schema, rootValue, operationName, operation = getDelegatingOperation(info.parentType, info.schema), fieldName = info.fieldName, selectionSet, fieldNodes, context, } = options;
    const request = createRequestFromInfo({
        info,
        operation,
        fieldName,
        selectionSet,
        fieldNodes,
        rootValue: rootValue !== null && rootValue !== void 0 ? rootValue : schema.rootValue,
        operationName,
        context,
    });
    return delegateRequest({
        ...options,
        request,
    });
}
function getDelegationReturnType(targetSchema, operation, fieldName) {
    const rootType = utils.getDefinedRootType(targetSchema, operation);
    return rootType.getFields()[fieldName].type;
}
function delegateRequest(options) {
    const delegationContext = getDelegationContext(options);
    const transformer = new Transformer(delegationContext);
    const processedRequest = transformer.transformRequest(options.request);
    if (options.validateRequest) {
        validateRequest(delegationContext, processedRequest.document);
    }
    const executor = getExecutor(delegationContext);
    return new valueOrPromise.ValueOrPromise(() => executor(processedRequest))
        .then(originalResult => {
        if (utils.isAsyncIterable(originalResult)) {
            const iterator = originalResult[Symbol.asyncIterator]();
            // "subscribe" to the subscription result and map the result through the transforms
            return utils.mapAsyncIterator(iterator, result => transformer.transformResult(result));
        }
        return transformer.transformResult(originalResult);
    })
        .resolve();
}
function getDelegationContext({ request, schema, fieldName, returnType, args, info, transforms = [], transformedSchema, skipTypeMerging = false, }) {
    var _a, _b, _c, _d;
    const operationDefinition = utils.getOperationASTFromRequest(request);
    let targetFieldName;
    if (fieldName == null) {
        targetFieldName = operationDefinition.selectionSet.selections[0].name.value;
    }
    else {
        targetFieldName = fieldName;
    }
    const stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a['stitchingInfo'];
    const subschemaOrSubschemaConfig = (_b = stitchingInfo === null || stitchingInfo === void 0 ? void 0 : stitchingInfo.subschemaMap.get(schema)) !== null && _b !== void 0 ? _b : schema;
    const operation = operationDefinition.operation;
    if (isSubschemaConfig(subschemaOrSubschemaConfig)) {
        const targetSchema = subschemaOrSubschemaConfig.schema;
        return {
            subschema: schema,
            subschemaConfig: subschemaOrSubschemaConfig,
            targetSchema,
            operation,
            fieldName: targetFieldName,
            args,
            context: request.context,
            info,
            returnType: (_c = returnType !== null && returnType !== void 0 ? returnType : info === null || info === void 0 ? void 0 : info.returnType) !== null && _c !== void 0 ? _c : getDelegationReturnType(targetSchema, operation, targetFieldName),
            transforms: subschemaOrSubschemaConfig.transforms != null
                ? subschemaOrSubschemaConfig.transforms.concat(transforms)
                : transforms,
            transformedSchema: transformedSchema !== null && transformedSchema !== void 0 ? transformedSchema : (subschemaOrSubschemaConfig instanceof Subschema ? subschemaOrSubschemaConfig.transformedSchema : targetSchema),
            skipTypeMerging,
        };
    }
    return {
        subschema: schema,
        subschemaConfig: undefined,
        targetSchema: subschemaOrSubschemaConfig,
        operation,
        fieldName: targetFieldName,
        args,
        context: request.context,
        info,
        returnType: (_d = returnType !== null && returnType !== void 0 ? returnType : info === null || info === void 0 ? void 0 : info.returnType) !== null && _d !== void 0 ? _d : getDelegationReturnType(subschemaOrSubschemaConfig, operation, targetFieldName),
        transforms,
        transformedSchema: transformedSchema !== null && transformedSchema !== void 0 ? transformedSchema : subschemaOrSubschemaConfig,
        skipTypeMerging,
    };
}
function validateRequest(delegationContext, document) {
    const errors = graphql.validate(delegationContext.targetSchema, document);
    if (errors.length > 0) {
        if (errors.length > 1) {
            const combinedError = new utils.AggregateError(errors, errors.map(error => error.message).join(', \n'));
            throw combinedError;
        }
        const error = errors[0];
        throw error.originalError || error;
    }
}
const GLOBAL_CONTEXT = {};
function getExecutor(delegationContext) {
    const { subschemaConfig, targetSchema, context } = delegationContext;
    let executor = (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.executor) || createDefaultExecutor(targetSchema);
    if (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.batch) {
        const batchingOptions = subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.batchingOptions;
        executor = batchExecute.getBatchingExecutor(context !== null && context !== void 0 ? context : GLOBAL_CONTEXT, executor, batchingOptions === null || batchingOptions === void 0 ? void 0 : batchingOptions.dataLoaderOptions, batchingOptions === null || batchingOptions === void 0 ? void 0 : batchingOptions.extensionsReducer);
    }
    return executor;
}
const createDefaultExecutor = utils.memoize1(function createDefaultExecutor(schema) {
    return function defaultExecutor(request) {
        const operationAst = utils.getOperationASTFromRequest(request);
        const executionArgs = {
            schema,
            document: request.document,
            contextValue: request.context,
            variableValues: request.variables,
            rootValue: request.rootValue,
            operationName: request.operationName,
        };
        if (operationAst.operation === 'subscription') {
            return graphql.subscribe(executionArgs);
        }
        return graphql.execute(executionArgs);
    };
});

exports.Subschema = Subschema;
exports.Transformer = Transformer;
exports.annotateExternalObject = annotateExternalObject;
exports.applySchemaTransforms = applySchemaTransforms;
exports.cloneSubschemaConfig = cloneSubschemaConfig;
exports.createDefaultExecutor = createDefaultExecutor;
exports.createRequest = createRequest;
exports.createRequestFromInfo = createRequestFromInfo;
exports.defaultMergedResolver = defaultMergedResolver;
exports.delegateRequest = delegateRequest;
exports.delegateToSchema = delegateToSchema;
exports.getDelegatingOperation = getDelegatingOperation;
exports.getSubschema = getSubschema;
exports.getUnpathedErrors = getUnpathedErrors;
exports.isExternalObject = isExternalObject;
exports.isSubschema = isSubschema;
exports.isSubschemaConfig = isSubschemaConfig;
exports.mergeFields = mergeFields;
exports.resolveExternalValue = resolveExternalValue;
