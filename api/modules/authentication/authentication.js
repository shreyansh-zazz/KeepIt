import { GraphQLModule } from '@graphql-modules/core'
import * as typeDefs from './authentication.schema.graphql'
import resolvers from './authentication.resolver'

const Authentication = new GraphQLModule({
  typeDefs,
  resolvers,
  context: req => req
})

export default Authentication
