'use strict'

import Hapi from '@hapi/hapi'
import { ApolloServer } from 'apollo-server-hapi'
import mongoose from 'mongoose'

import config from './config/config'
import Modules from './modules/modules'

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

  server.installSubscriptionHandlers(app.listener)

  mongoose.connection.on('error', console.error.bind(console, 'connection error:'))

  app.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'success'
    }
  })

  await app.start().then(data => {
    if (!config) {
      throw new Error('Configuration settings failed. Please restart the server.')
    }
  })
}

process.on('unhandledRejection', (err) => {
  console.log(err)

  if (process.env.NODE_ENV !== 'test') {
    process.exit(1)
  }
})

StartServer().catch(error => console.log(error))
