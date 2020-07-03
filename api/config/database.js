import mongoose from 'mongoose'

const databaseHost = process.env.DATABASE_HOST || '127.0.0.1'
const databseSRV = process.env.DATABASE_SRV ? '+srv' : ''
const databasePort = process.env.DATABASE_PORT || 27017
const databaseName = process.env.DATABASE_NAME || 'keepit'
const databaseAuth = process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME.concat([':', process.env.DATABASE_PASSWORD, '@']) : ''
const databaseConnectionAuth = process.env.AUTHENTICATION_DATABASE || 'admin'
const databaseSSL = process.env.DATABASE_SSL || false

const databaseURL = `mongodb${databseSRV}://${databaseAuth}${databaseHost}:${databasePort}/${databaseName}?authSource=${databaseConnectionAuth}`

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  ssl: databaseSSL
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(err)
  })

export default mongoose.connection
