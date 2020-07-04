import _ from 'lodash'

import JWTHelper from '../helpers/encrypt-decrypt/jwt'

const nodeENV = {
  NODE_ENV: process.env.NODE_ENV,
  IS_DEV: false,
  IS_TEST: false,
  IS_PROD: false
}

switch (nodeENV.NODE_ENV) {
  case 'development':
    nodeENV.IS_DEV = true
    break
  case 'test':
    nodeENV.IS_TEST = true
    break
  case 'production':
    nodeENV.IS_PROD = true
    break
  default:
    nodeENV.IS_DEV = true
}

const databaseHost = process.env.DATABASE_HOST || '127.0.0.1'
const databseSRV = process.env.DATABASE_SRV ? '+srv' : ''
const databasePort = process.env.DATABASE_PORT || 27017
const databaseName = process.env.DATABASE_NAME || 'keepit'
const databaseAuth = process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME.concat([':', process.env.DATABASE_PASSWORD, '@']) : ''
const databaseConnectionAuth = process.env.AUTHENTICATION_DATABASE || 'admin'
const databaseSSL = process.env.DATABASE_SSL || false
const databaseURL = `mongodb${databseSRV}://${databaseAuth}${databaseHost}:${databasePort}/${databaseName}?authSource=${databaseConnectionAuth}`
const dbConfigs = {
  DATABASE_HOST: databaseHost,
  DATABASE_SRV: process.env.DATABASE_SRV || false,
  DATABASE_PORT: databasePort,
  DATABASE_NAME: databaseName,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  AUTHENTICATION_DATABASE: databaseConnectionAuth,
  DATABASE_SSL: databaseSSL,
  DATABASE_URL: databaseURL
}

const jwt = {
  JWT_SECRET_KEY: process.env.SECRET_KEY ? process.env.SECRET_KEY : JWTHelper.getASecretKey(),
  JWT_REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY ? process.env.REFRESH_SECRET_KEY : JWTHelper.getASecretKey()
}

export default _.merge(nodeENV, jwt, dbConfigs)
