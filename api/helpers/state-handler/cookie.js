import config from '../../config/config'

const cookies = [{
  name: 'session',
  options: {
    ttl: 1000 * 60 * 60 * 24 * 10,
    isSecure: config.IS_PROD || false,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: true,
    isSameSite: 'None'
  }
}]

export default cookies
