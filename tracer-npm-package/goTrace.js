// import { exec } from 'child_process';
import { parse, validate, execute } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { v4 as uuidv4 } from 'uuid';

const loggingMiddleware = async (resolve, root, args, context, info) => {
  const startTime = process.hrtime();
  const result = await resolve(root, args, context, info);
  const endTime = process.hrtime(startTime);
  const duration = JSON.parse((endTime[1] / 1e6).toFixed(2));
  context[`${info.parentType}.${info.fieldName}`] = duration;
  return result;
}

let PORT = 1234;
let served = false;

module.exports = async function goTrace(schema, query, root, context, variables) {

  // if (!served) {
  //   served = true;
  //   console.log('started app')
  //   const start = exec('npm run build', {
  //     encoding: 'utf-8'
  //   })
  //     .on('error', function(err){ 
  //       throw err 
  //     });
  // }

  // Initial object that will hold all the data we want to send to trace
  const rootQueryObj = { trace_id: uuidv4() };

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

  rootQueryObj.totalDuration = JSON.parse((endTime[1] / 1e6).toFixed(2));
  rootQueryObj['response'] = response;

  fetch('http://localhost:3000/api/socketio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rootQueryObj)
  });

  return response;
}