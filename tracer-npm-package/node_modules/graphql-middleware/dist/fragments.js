'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const graphql = require('graphql');

function extractFragmentReplacements(resolvers) {
  const allFragmentReplacements = [];
  for (const typeName in resolvers) {
    const fieldResolvers = resolvers[typeName];
    for (const fieldName in fieldResolvers) {
      const fieldResolver = fieldResolvers[fieldName];
      if (typeof fieldResolver === "object" && fieldResolver.fragment) {
        allFragmentReplacements.push({
          field: fieldName,
          fragment: fieldResolver.fragment
        });
      }
      if (typeof fieldResolver === "object" && fieldResolver.fragments) {
        for (const fragment of fieldResolver.fragments) {
          allFragmentReplacements.push({
            field: fieldName,
            fragment
          });
        }
      }
    }
  }
  const fragmentReplacements = allFragmentReplacements.filter((fragment) => Boolean(fragment)).map((fragmentReplacement) => {
    const fragment = parseFragmentToInlineFragment(fragmentReplacement.fragment);
    const newSelections = fragment.selectionSet.selections.filter((node) => {
      switch (node.kind) {
        case graphql.Kind.FIELD: {
          return node.name.value !== fragmentReplacement.field;
        }
        default: {
          return true;
        }
      }
    });
    if (newSelections.length === 0) {
      return null;
    }
    const newFragment = {
      ...fragment,
      selectionSet: {
        kind: fragment.selectionSet.kind,
        loc: fragment.selectionSet.loc,
        selections: newSelections
      }
    };
    const parsedFragment = graphql.print(newFragment);
    return {
      field: fragmentReplacement.field,
      fragment: parsedFragment
    };
  }).filter((fr) => fr !== null);
  return fragmentReplacements;
  function parseFragmentToInlineFragment(definitions) {
    if (definitions.trim().startsWith("fragment")) {
      const document = graphql.parse(definitions);
      for (const definition of document.definitions) {
        if (definition.kind === graphql.Kind.FRAGMENT_DEFINITION) {
          return {
            kind: graphql.Kind.INLINE_FRAGMENT,
            typeCondition: definition.typeCondition,
            selectionSet: definition.selectionSet
          };
        }
      }
    }
    const query = graphql.parse(`{${definitions}}`).definitions[0];
    for (const selection of query.selectionSet.selections) {
      if (selection.kind === graphql.Kind.INLINE_FRAGMENT) {
        return selection;
      }
    }
    throw new Error("Could not parse fragment");
  }
}

exports.extractFragmentReplacements = extractFragmentReplacements;
