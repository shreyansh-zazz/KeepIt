import mongoose from 'mongoose'

import ENV from './env'

if (!ENV.IS_TEST) {
  mongoose.connect(ENV.DATABASE_URL, {
    useNewUrlParser: true,
    ssl: ENV.DATABASE_SSL
  })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Database connected')
    })
    .catch((err) => {
      throw err
    })
} else {
  mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => {
      console.log('Database Connected')
    })
    .catch(err => {
      throw err
    })
}

export default {
  DB: mongoose.connection
}
