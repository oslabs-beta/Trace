
import { parse, validate, execute } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { fs } from 'fs';

const loggingMiddleware = async (resolve, root, args, context, info) => {
  const startTime = process.hrtime();
  const result = await resolve(root, args, context, info);
  const endTime = process.hrtime(startTime);
  const duration = JSON.parse((endTime[1] / 1e6).toFixed(2));
  context[`${info.parentType}.${info.fieldName}`] = duration;
  return result;
}

module.exports = async function goTrace(schema, query, root, context, variables) {
  // Initial object that will hold all the data we want to send to trace
  const rootQueryObj = {};

  schema = applyMiddleware(schema, loggingMiddleware);

  const queryAST = parse(query);
  // Validate the incoming queryAST against the GraphQLSchema Object
  const errors = validate(schema, queryAST);
  if (errors.length === 0) {
    console.log(`Validation successful query can be executed`);  
  } else {
    Object.keys(rootQueryObj).includes('errors') ? rootQueryObj['errors'].push(errors) : rootQueryObj['errors'] = [...errors];
  }

  let endTime;
  let response;

  // Execute the query against the schema
  const currentDate = new Date(); 
  const timestamp = currentDate. getTime()
  const dateAndTime = `${currentDate} | ${timestamp}`;

  rootQueryObj['dateAndTime'] = dateAndTime;

  const startTime = process.hrtime();
  const queryMetrics = await execute(schema, queryAST, null, rootQueryObj, variables)
    .then((result) => {
      endTime = process.hrtime(startTime);
      response = result;
    })
    .then(() => { return rootQueryObj })
    .catch(err => {
      Object.keys(rootQueryObj).includes('errors') ? rootQueryObj['errors'].push(err.message) : rootQueryObj['errors'] = [...err.message];
    });

  //rootQueryObj.totalDuration = JSON.parse((endTime[1] / 1e6).toFixed(2));

  fetch('http://localhost:3000/api/socketio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rootQueryObj)
  });

  return response;
}