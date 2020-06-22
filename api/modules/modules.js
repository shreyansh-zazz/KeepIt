import { GraphQLModule } from '@graphql-modules/core';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

import Authentication from './authentication/authentication';

const schemas = [
  Authentication.typeDefs,
];

const resolvers = [
  Authentication.resolvers,
];

const modules = new GraphQLModule({
  typeDefs: mergeTypeDefs(schemas, { all: true }),
  resolvers: mergeResolvers(resolvers),
});

export default modules;
