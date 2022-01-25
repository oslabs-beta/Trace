const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { parse, validate, execute } = require('graphql')
const { applyMiddleware } = require('graphql-middleware')
const { v4: uuidv4 } = require('uuid')
const fetch = require("node-fetch");

const loggingMiddleware = (_context) => {
  return async (resolve, root, args, context, info) => {
    const startTime = process.hrtime();
    const result = await resolve(root, args, _context, info);
    const endTime = process.hrtime(startTime);
    const duration = JSON.parse((endTime[1] / 1e6).toFixed(2));
    context[`${info.parentType}.${info.fieldName}`] = duration;
    return result;
  }
}

let served = false;

const runTrace = async () => {
  if (!served) {
    served = true;
    await exec('cd node_modules && cd @go-trace/tracer && node server.js')
  }
}

module.exports = async function goTrace(schema, query, root, context, variables) {

  runTrace();

  // Initial object that will hold all the data we want to send to trace
  const rootQueryObj = { trace_id: uuidv4() };

  schema = applyMiddleware(schema, loggingMiddleware(context));

  const queryAST = parse(query);
  // Validate the incoming queryAST against the GraphQLSchema Object
  const errors = validate(schema, queryAST);
  if (errors.length === 0) {
    console.log(`Validation successful query can be executed`);  
  } else {
    rootQueryObj.hasOwnProperty('errors') ? rootQueryObj['errors'].push(errors) : rootQueryObj['errors'] = [...errors];
  }

  let endTime;
  let response;

  // Execute the query against the schema
  const currentDate = new Date(); 
  const timestamp = currentDate.getTime()
  const dateAndTime = `${currentDate} | ${timestamp}`;

  rootQueryObj['dateAndTime'] = dateAndTime;

  const startTime = process.hrtime();
  const queryMetrics = await execute(schema, queryAST, null, null, variables)
    .then((result) => {
      endTime = process.hrtime(startTime);
      response = result;
    })
    .then(() => { return rootQueryObj })
    .catch(err => {
      // rootQueryObj.hasOwnProperty('errors')
      rootQueryObj.hasOwnProperty('errors') ? rootQueryObj['errors'].push(err.message) : rootQueryObj['errors'] = [...err.message];
    });

  rootQueryObj.totalDuration = JSON.parse((endTime[1] / 1e6).toFixed(2));
  rootQueryObj['response'] = response;

  try {
    await fetch('http://localhost:2929/socketio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rootQueryObj)
    })
  } catch {
    setTimeout(() => {
      fetch('http://localhost:2929/socketio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rootQueryObj)
    })
    }, 1000)
  }

  return response;
}