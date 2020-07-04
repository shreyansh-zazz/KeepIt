import { randomBytes } from 'crypto'
import { JWT, JWK } from 'jose'
import config from '../../config/config'

const getASecretKey = () => {
  return randomBytes(56).toString('hex')
}

const getJWT = async (payload) => {
  const key = JWK.asKey({
    kty: 'oct',
    k: config.JWT_SECRET_KEY
  })

  const token = JWT.sign(payload, key, {
    audience: ['urn:example:client'],
    issuer: 'https://op.example.com',
    expiresIn: '2 hours',
    header: {
      typ: 'JWT'
    }
  })

  return token
}

export default {
  getASecretKey: getASecretKey,
  getJWT: getJWT
}
