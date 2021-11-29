const {
  parse,
  validate,
  execute,
} = require('graphql');
const { applyMiddleware } = require('graphql-middleware');
const fs = require('fs');

const loggingMiddleware = async (resolve, root, args, context, info) => {
  const startTime = process.hrtime();
  const result = await resolve(root, args, context, info);
  const endTime = process.hrtime(startTime);
  const duration = JSON.parse((endTime[1] / 1e6).toFixed(2));
  const resolverData = {
    parentType: info.parentType,
    fieldName: info.fieldName,
    // startTime,
    // endTime,
    duration,
    returnValue: result,
  };
  
  // context is our Main Query Object
  // grab the keys of this object
  const numKeys = Object.keys(context);
  // if no keys exist it has just been initialized; 
  // populate it for the first time
  if (!numKeys[0]) context[0] = resolverData;
  else {
    // every other time, parse the last key to a number
    let next = JSON.parse(numKeys[numKeys.length - 1]);
    // increment that number and assign the new 
    // resolver data to that number
    context[++next] = resolverData;
  }
  return result;
}

module.exports = async function goTrace(schema, query) {
  schema = applyMiddleware(schema, loggingMiddleware);

  const queryAST = parse(query);
  // Validate the incoming queryAST against the GraphQLSchema Object
  const errors = validate(schema, queryAST);
  if (errors.length === 0) {
    console.log(`Validation successful query can be executed`);  
  } else {
    console.log(`Error during validation: ${JSON.stringify(errors)}`); 
    //! send to error log   
  }

  // build data obj
  // 
  const data = {};
  const rootQueryObj = {};
  startTime = process.hrtime();
  // Execute the query against the schema
  let response;
  const queryMetrics = await execute(schema, queryAST, null, rootQueryObj)
    // .then(result => console.log(`Execution result: \n${JSON.stringify(result)}`))
    .then(() => {
      return rootQueryObj
    })
    .catch(err => console.log(err));

  // console.log('metrics attempt', queryMetrics);

  const endTime = process.hrtime(startTime);
  data.duration = JSON.parse((endTime[1] / 1e6).toFixed(2));

  queryMetrics.finalMetrics = data;
  const finalize = {fullQuery: queryMetrics};
  console.log(finalize);

  let persist = fs.readFileSync('./metrics.json', 'utf-8');
  persist = await JSON.parse(persist);

  await persist.push(finalize);
  fs.writeFileSync('./metrics.json', JSON.stringify(persist));
  console.log(JSON.stringify(finalize));
  // console.log('Overall metrics: ', data);
  
  return response;
}