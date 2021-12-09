'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const DataLoader = _interopDefault(require('dataloader'));
const utils = require('@graphql-tools/utils');
const graphql = require('graphql');

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
function createPrefix(index) {
    return `_${index}_`;
}
function parseKey(prefixedKey) {
    const match = /^_([\d]+)_(.*)$/.exec(prefixedKey);
    if (match && match.length === 3 && !isNaN(Number(match[1])) && match[2]) {
        return { index: Number(match[1]), originalKey: match[2] };
    }
    throw new Error(`Key ${prefixedKey} is not correctly prefixed`);
}

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
/**
 * Merge multiple queries into a single query in such a way that query results
 * can be split and transformed as if they were obtained by running original queries.
 *
 * Merging algorithm involves several transformations:
 *  1. Replace top-level fragment spreads with inline fragments (... on Query {})
 *  2. Add unique aliases to all top-level query fields (including those on inline fragments)
 *  3. Prefix all variable definitions and variable usages
 *  4. Prefix names (and spreads) of fragments
 *
 * i.e transform:
 *   [
 *     `query Foo($id: ID!) { foo, bar(id: $id), ...FooQuery }
 *     fragment FooQuery on Query { baz }`,
 *
 *    `query Bar($id: ID!) { foo: baz, bar(id: $id), ... on Query { baz } }`
 *   ]
 * to:
 *   query (
 *     $graphqlTools1_id: ID!
 *     $graphqlTools2_id: ID!
 *   ) {
 *     graphqlTools1_foo: foo,
 *     graphqlTools1_bar: bar(id: $graphqlTools1_id)
 *     ... on Query {
 *       graphqlTools1__baz: baz
 *     }
 *     graphqlTools1__foo: baz
 *     graphqlTools1__bar: bar(id: $graphqlTools1__id)
 *     ... on Query {
 *       graphqlTools1__baz: baz
 *     }
 *   }
 */
function mergeRequests(requests, extensionsReducer) {
    var _a;
    const mergedVariables = Object.create(null);
    const mergedVariableDefinitions = [];
    const mergedSelections = [];
    const mergedFragmentDefinitions = [];
    let mergedExtensions = Object.create(null);
    for (const index in requests) {
        const request = requests[index];
        const prefixedRequests = prefixRequest(createPrefix(index), request);
        for (const def of prefixedRequests.document.definitions) {
            if (isOperationDefinition(def)) {
                mergedSelections.push(...def.selectionSet.selections);
                if (def.variableDefinitions) {
                    mergedVariableDefinitions.push(...def.variableDefinitions);
                }
            }
            if (isFragmentDefinition(def)) {
                mergedFragmentDefinitions.push(def);
            }
        }
        Object.assign(mergedVariables, prefixedRequests.variables);
        mergedExtensions = extensionsReducer(mergedExtensions, request);
    }
    const firstRequest = requests[0];
    const operationType = (_a = firstRequest.operationType) !== null && _a !== void 0 ? _a : utils.getOperationASTFromRequest(firstRequest).operation;
    const mergedOperationDefinition = {
        kind: graphql.Kind.OPERATION_DEFINITION,
        operation: operationType,
        variableDefinitions: mergedVariableDefinitions,
        selectionSet: {
            kind: graphql.Kind.SELECTION_SET,
            selections: mergedSelections,
        },
    };
    return {
        document: {
            kind: graphql.Kind.DOCUMENT,
            definitions: [mergedOperationDefinition, ...mergedFragmentDefinitions],
        },
        variables: mergedVariables,
        extensions: mergedExtensions,
        context: requests[0].context,
        info: requests[0].info,
        operationType,
    };
}
function prefixRequest(prefix, request) {
    var _a;
    const executionVariables = (_a = request.variables) !== null && _a !== void 0 ? _a : {};
    function prefixNode(node) {
        return prefixNodeName(node, prefix);
    }
    let prefixedDocument = aliasTopLevelFields(prefix, request.document);
    const executionVariableNames = Object.keys(executionVariables);
    const hasFragmentDefinitions = request.document.definitions.some(def => isFragmentDefinition(def));
    const fragmentSpreadImpl = {};
    if (executionVariableNames.length > 0 || hasFragmentDefinitions) {
        prefixedDocument = graphql.visit(prefixedDocument, {
            [graphql.Kind.VARIABLE]: prefixNode,
            [graphql.Kind.FRAGMENT_DEFINITION]: prefixNode,
            [graphql.Kind.FRAGMENT_SPREAD]: node => {
                node = prefixNodeName(node, prefix);
                fragmentSpreadImpl[node.name.value] = true;
                return node;
            },
        });
    }
    const prefixedVariables = {};
    for (const variableName of executionVariableNames) {
        prefixedVariables[prefix + variableName] = executionVariables[variableName];
    }
    if (hasFragmentDefinitions) {
        prefixedDocument = {
            ...prefixedDocument,
            definitions: prefixedDocument.definitions.filter(def => {
                return !isFragmentDefinition(def) || fragmentSpreadImpl[def.name.value];
            }),
        };
    }
    return {
        document: prefixedDocument,
        variables: prefixedVariables,
    };
}
/**
 * Adds prefixed aliases to top-level fields of the query.
 *
 * @see aliasFieldsInSelection for implementation details
 */
function aliasTopLevelFields(prefix, document) {
    const transformer = {
        [graphql.Kind.OPERATION_DEFINITION]: (def) => {
            const { selections } = def.selectionSet;
            return {
                ...def,
                selectionSet: {
                    ...def.selectionSet,
                    selections: aliasFieldsInSelection(prefix, selections, document),
                },
            };
        },
    };
    return graphql.visit(document, transformer, {
        [graphql.Kind.DOCUMENT]: [`definitions`],
    });
}
/**
 * Add aliases to fields of the selection, including top-level fields of inline fragments.
 * Fragment spreads are converted to inline fragments and their top-level fields are also aliased.
 *
 * Note that this method is shallow. It adds aliases only to the top-level fields and doesn't
 * descend to field sub-selections.
 *
 * For example, transforms:
 *   {
 *     foo
 *     ... on Query { foo }
 *     ...FragmentWithBarField
 *   }
 * To:
 *   {
 *     graphqlTools1_foo: foo
 *     ... on Query { graphqlTools1_foo: foo }
 *     ... on Query { graphqlTools1_bar: bar }
 *   }
 */
function aliasFieldsInSelection(prefix, selections, document) {
    return selections.map(selection => {
        switch (selection.kind) {
            case graphql.Kind.INLINE_FRAGMENT:
                return aliasFieldsInInlineFragment(prefix, selection, document);
            case graphql.Kind.FRAGMENT_SPREAD: {
                const inlineFragment = inlineFragmentSpread(selection, document);
                return aliasFieldsInInlineFragment(prefix, inlineFragment, document);
            }
            case graphql.Kind.FIELD:
            default:
                return aliasField(selection, prefix);
        }
    });
}
/**
 * Add aliases to top-level fields of the inline fragment.
 * Returns new inline fragment node.
 *
 * For Example, transforms:
 *   ... on Query { foo, ... on Query { bar: foo } }
 * To
 *   ... on Query { graphqlTools1_foo: foo, ... on Query { graphqlTools1_bar: foo } }
 */
function aliasFieldsInInlineFragment(prefix, fragment, document) {
    const { selections } = fragment.selectionSet;
    return {
        ...fragment,
        selectionSet: {
            ...fragment.selectionSet,
            selections: aliasFieldsInSelection(prefix, selections, document),
        },
    };
}
/**
 * Replaces fragment spread with inline fragment
 *
 * Example:
 *   query { ...Spread }
 *   fragment Spread on Query { bar }
 *
 * Transforms to:
 *   query { ... on Query { bar } }
 */
function inlineFragmentSpread(spread, document) {
    const fragment = document.definitions.find(def => isFragmentDefinition(def) && def.name.value === spread.name.value);
    if (!fragment) {
        throw new Error(`Fragment ${spread.name.value} does not exist`);
    }
    const { typeCondition, selectionSet } = fragment;
    return {
        kind: graphql.Kind.INLINE_FRAGMENT,
        typeCondition,
        selectionSet,
        directives: spread.directives,
    };
}
function prefixNodeName(namedNode, prefix) {
    return {
        ...namedNode,
        name: {
            ...namedNode.name,
            value: prefix + namedNode.name.value,
        },
    };
}
/**
 * Returns a new FieldNode with prefixed alias
 *
 * Example. Given prefix === "graphqlTools1_" transforms:
 *   { foo } -> { graphqlTools1_foo: foo }
 *   { foo: bar } -> { graphqlTools1_foo: bar }
 */
function aliasField(field, aliasPrefix) {
    const aliasNode = field.alias ? field.alias : field.name;
    return {
        ...field,
        alias: {
            ...aliasNode,
            value: aliasPrefix + aliasNode.value,
        },
    };
}
function isOperationDefinition(def) {
    return def.kind === graphql.Kind.OPERATION_DEFINITION;
}
function isFragmentDefinition(def) {
    return def.kind === graphql.Kind.FRAGMENT_DEFINITION;
}

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
/**
 * Split and transform result of the query produced by the `merge` function
 */
function splitResult({ data, errors }, numResults) {
    const splitResults = [];
    for (let i = 0; i < numResults; i++) {
        splitResults.push({});
    }
    if (data) {
        for (const prefixedKey in data) {
            const { index, originalKey } = parseKey(prefixedKey);
            const result = splitResults[index];
            if (result == null) {
                continue;
            }
            if (result.data == null) {
                result.data = { [originalKey]: data[prefixedKey] };
            }
            else {
                result.data[originalKey] = data[prefixedKey];
            }
        }
    }
    if (errors) {
        for (const error of errors) {
            if (error.path) {
                const parsedKey = parseKey(error.path[0]);
                const { index, originalKey } = parsedKey;
                const newError = utils.relocatedError(error, [originalKey, ...error.path.slice(1)]);
                const resultErrors = (splitResults[index].errors = (splitResults[index].errors || []));
                resultErrors.push(newError);
            }
            else {
                splitResults.forEach(result => {
                    const resultErrors = (result.errors = (result.errors || []));
                    resultErrors.push(new graphql.GraphQLError(error.message));
                });
            }
        }
    }
    return splitResults;
}

function createBatchingExecutor(executor, dataLoaderOptions, extensionsReducer = defaultExtensionsReducer) {
    const loadFn = createLoadFn(executor, extensionsReducer);
    const loader = new DataLoader(loadFn, dataLoaderOptions);
    return function batchingExecutor(request) {
        const operationAst = utils.getOperationASTFromRequest(request);
        return operationAst.operation === 'subscription' ? executor(request) : loader.load(request);
    };
}
function createLoadFn(executor, extensionsReducer) {
    return async function batchExecuteLoadFn(requests) {
        const execBatches = [];
        let index = 0;
        const request = requests[index];
        let currentBatch = [request];
        execBatches.push(currentBatch);
        const operationAst = utils.getOperationASTFromRequest(request);
        const operationType = operationAst.operation;
        if (operationType == null) {
            throw new Error('could not identify operation type of document');
        }
        while (++index < requests.length) {
            const currentRequest = requests[index];
            const currentOperationAST = utils.getOperationASTFromRequest(currentRequest);
            const currentOperationType = currentOperationAST.operation;
            if (operationType === currentOperationType) {
                currentBatch.push(currentRequest);
            }
            else {
                currentBatch = [currentRequest];
                execBatches.push(currentBatch);
            }
        }
        const results = await Promise.all(execBatches.map(async (execBatch) => {
            const mergedRequests = mergeRequests(execBatch, extensionsReducer);
            const resultBatches = (await executor(mergedRequests));
            return splitResult(resultBatches, execBatch.length);
        }));
        return results.flat();
    };
}
function defaultExtensionsReducer(mergedExtensions, request) {
    const newExtensions = request.extensions;
    if (newExtensions != null) {
        Object.assign(mergedExtensions, newExtensions);
    }
    return mergedExtensions;
}

const getBatchingExecutor = utils.memoize2of4(function getBatchingExecutor(_context, executor, dataLoaderOptions, extensionsReducer) {
    return createBatchingExecutor(executor, dataLoaderOptions, extensionsReducer);
});

exports.createBatchingExecutor = createBatchingExecutor;
exports.getBatchingExecutor = getBatchingExecutor;
