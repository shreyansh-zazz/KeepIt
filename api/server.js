'use strict'

import Hapi from '@hapi/hapi'
import { ApolloServer } from 'apollo-server-hapi'

import Modules from './modules/modules'
import DB from './config/database'

async function StartServer () {
  const server = new ApolloServer({
    typeDefs: Modules.typeDefs,
    resolvers: Modules.resolvers,
    context: async req => {
      return { ...req }
    }
  })

  // eslint-disable-next-line new-cap
  const app = new Hapi.server({
    port: 4000
  })

  await server.applyMiddleware({
    app
  })

  await server.installSubscriptionHandlers(app.listener)

  await DB.on('error', console.error.bind(console, 'connection error:'))

  app.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'success'
    }
  })

  await app.start()
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

StartServer().catch(error => console.log(error))
