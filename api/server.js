import { ApolloServer } from 'apollo-server'

import Modules from './modules/modules'
import DB from './config/database'

const server = new ApolloServer({
  typeDefs: Modules.typeDefs,
  resolvers: Modules.resolvers
})

DB.on('error', console.error.bind(console, 'connection error:'))

server.listen().then(({
  url
}) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`)
})
