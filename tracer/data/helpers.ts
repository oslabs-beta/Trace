//! How do we get this to dynamically display the file?
const resolverData = require('./sample.json');

const resolverAvg = {
    'Query.getUsers': 20.6,
    'Mutation.signup': 174.45,
    'User.username': 0.02,
    'AuthToken.token': 0.02,
};

export const helpers = {
    getAll: () => resolverData,
    // function to calculate average for root queries
    getAvgs: () => resolverAvg
};