// const {
//   parse,
//   validate,
//   execute,
// } = require('graphql');
// const { applyMiddleware } = require('graphql-middleware');
// const fs = require('fs');

// const loggingMiddleware = async (resolve, root, args, context, info) => {
//   const startTime = process.hrtime();
//   const result = await resolve(root, args, context, info);
//   const endTime = process.hrtime(startTime);
//   const duration = JSON.parse((endTime[1] / 1e6).toFixed(2));
//   context[`${info.parentType}.${info.fieldName}`] = duration;
//   return result;
// }

// module.exports = async function goTrace(schema, query, root, context, variables) {
//   schema = applyMiddleware(schema, loggingMiddleware);

//   const queryAST = parse(query);
//   // Validate the incoming queryAST against the GraphQLSchema Object
//   const errors = validate(schema, queryAST);
//   if (errors.length === 0) {
//     console.log(`Validation successful query can be executed`);  
//   } else {
//     //rewrite this 
//     const formerData = fs.readFileSync('./errors.json') || [];
//     formerData.push(errors);
//     fs.writeFileSync('./errors.json', JSON.stringify(formerData), 'utf8');
//   }

//   const rootQueryObj = {};
//   let endTime;
//   let response;
//   // Execute the query against the schema
//   const startTime = process.hrtime();
//   const queryMetrics = await execute(schema, queryAST, null, rootQueryObj, variables)
//     .then((result) => {
//       endTime = process.hrtime(startTime);
//       response = result;
//     })
//     .then(() => { return rootQueryObj })
//     .catch(err => {
//       const formerData = fs.readFileSync('./errors.json') || [];
//       formerData.push(err, err.message);
//       fs.writeFileSync('./errors.json', JSON.stringify(formerData), 'utf8');
//     });

//   rootQueryObj.totalDuration = JSON.parse((endTime[1] / 1e6).toFixed(2));

//   let resolverData;

//   try {
//     resolverData = JSON.parse(fs.readFileSync('./resolverMetrics.json'));
//   } catch (err) {
//     console.log('Creating resolverData file!');
//     resolverData = [];
//   }

//   try {
//     resolverData.push(queryMetrics);
//     fs.writeFileSync('./resolverMetrics.json', JSON.stringify(resolverData), 'utf8');
//   } catch(err) {
//     console.log('Data writing error:', err, err.message);
//   }

//   return response;
// }