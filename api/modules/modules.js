import { GraphQLModule } from '@graphql-modules/core'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import Common from './common/common'
import Authentication from './authentication/authentication'

const schemas = [
  Common.typeDefs,
  Authentication.typeDefs
]

const resolvers = [
  Authentication.resolvers
]

const modules = new GraphQLModule({
  typeDefs: mergeTypeDefs(schemas, { all: true }),
  resolvers: mergeResolvers(resolvers)
})

export default modules
