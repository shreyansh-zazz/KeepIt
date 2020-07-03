import setConfigurations from '../env'
import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)
mongoose.promise = global.Promise

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      if (error.message === 'ns not found') return
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

module.exports = {
  setupTestConfigs (moduleName) {
    // Connect to Mongoose
    beforeAll(async () => {
      await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        console.log(`Database connect successfully for module: ${moduleName}`)
      })

      setConfigurations()
    })

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections()
    })

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections()
      await mongoose.connection.close()
    })
  }
}
