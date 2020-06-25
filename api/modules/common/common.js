import { GraphQLModule } from '@graphql-modules/core'
import * as typeDefs from './common.schema.graphql'

const Common = new GraphQLModule({
  typeDefs
})

export default Common
