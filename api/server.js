import { ApolloServer } from 'apollo-server';

import Authentication from './modules/authentication/authentication';

const server = new ApolloServer({
  typeDefs: Authentication.typeDefs,
  resolvers: Authentication.resolvers,
});

server.listen().then(({
  url,
}) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
