import { ApolloServer } from 'apollo-server';

import Modules from './modules/modules';

const server = new ApolloServer({
  typeDefs: Modules.typeDefs,
  resolvers: Modules.resolvers,
});

server.listen().then(({
  url,
}) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
