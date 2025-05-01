import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { Query } from './resolvers/Query';
import { renderGraphiQL } from '@graphql-yoga/render-graphiql';
import { DbContext } from './types';
import { dbContext } from './db';
import {Mutation} from "./resolvers/Mutation";
const fs = require('fs');
const path = require('path');

export const schema = createSchema<DbContext>({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema/schema.graphql'),
    'utf-8'
  ),
  resolvers: {
    Query,
    Mutation,
  },
});

function main() {
  const yoga = createYoga<DbContext>({
    schema: schema,
    renderGraphiQL,
    context: dbContext,
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}

main();
