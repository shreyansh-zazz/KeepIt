import { getASecretKey } from '../helpers/encrypt-decrypt/jwt'

const setConfigurations = () => {
  const envSecretKey = getASecretKey()

  process.env.SECRET_KEY = envSecretKey
  if (!process.env.SECRET_KEY) {
    throw new Error('Unable to configure environment, please try again!')
  }
}

export default setConfigurations
