import { randomBytes } from 'crypto'
import { JWT, JWK } from 'jose'

const getASecretKey = () => {
  return randomBytes(56).toString('hex')
}

const getJWT = async (payload) => {
  const JWTSceretKey = process.env.SECRET_KEY

  const key = JWK.asKey({
    kty: 'oct',
    k: JWTSceretKey
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

module.exports = {
  getASecretKey: getASecretKey,
  getJWT: getJWT
}
