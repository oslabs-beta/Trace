require('dotenv').config()

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const { Pool } = require('pg');
const connectionString = process.env.DB_CONNECTION_STRING
const pool = new Pool({connectionString});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID
    },
    username: {
      type: GraphQLString
    },
  }
});

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLID
    },
    post_id: {
      type: GraphQLInt
    },
    text: {
      type: GraphQLString
    },
    user: {
      type: userType,
      resolve: async (obj) => {
        return pool.query(`
          SELECT * FROM "users"
          WHERE id = $1
        `, [obj.user_id]).then((result) => result.rows[0]);
      }
    },
  }
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    comments: {
      type: new GraphQLList(commentType),
      args: {
        limit: {
          type: GraphQLInt
        }
      },
      resolve: async (obj, args) => {
        return pool.query(`
          SELECT * FROM "comments"
          WHERE post_id = $1
          LIMIT $2
        `, [obj.id, args.limit]).then((result) => result.rows);
      }
    },
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      post: {
        type: postType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: async (obj, args) => {
          return pool.query(`SELECT * FROM "posts" WHERE id = $1`, [args.id])
            .then((result) => result.rows[0])
        }
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: async () => {
          return pool.query(`
            SELECT * FROM "posts"
          `, []).then((result) => result.rows);
        }
      },
    },
  }),
});

module.exports = schema;