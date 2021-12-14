const schema = require('./graphql');
const goTrace = require('@go-trace/tracer');
let request = require('supertest');
request = request('http://localhost:2929');


describe('goTrace', () => {  
  const query = `query ($id: Int!) { post (id: $id) { title }}`;
  const variables = { id: 1 };
  let queryResponse;

  beforeAll(async () => {
    queryResponse = await goTrace(schema, query, null, null, variables);
  });
  
  it('is an exported function', () => {
    expect(typeof goTrace).toBe('function');
  });

  it('properly spawns a localhost server at port 2929', () => {
    request.get('/').expect('Testing: server is running!')
  });

  it('returns the correct query response', () => {
    expect(queryResponse).toEqual({"data": {"post": {"title": "One easy trick to learn graphql"}}});
  });
});