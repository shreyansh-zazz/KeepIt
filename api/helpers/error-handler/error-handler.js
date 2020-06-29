import { ApolloError } from 'apollo-server'

import getErrorCode from './error-code'

const HandleError = (code, errorCtx = {}) => {
  const error = getErrorCode(code, errorCtx)
  if (error) {
    return new ApolloError(error.message, error.code, error.error)
  } else {
    return new ApolloError('Something went wrong, please try again!', 'INTERNAL_SERVER_ERROR', {})
  }
}

export default HandleError
