import { GraphQLModule } from '@graphql-modules/core'
import * as typeDefs from './authentication.schema.graphql'
import resolvers from './authentication.resolver'

const Authentication = new GraphQLModule({
  typeDefs,
  resolvers
})

export default Authentication
