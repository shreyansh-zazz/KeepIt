import UserInputError from './errors/UserInputError'
import DuplicateUserError from './errors/DuplicateUserError'
import IncorrectConfirmPassword from './errors/IncorrectConfirmPassword'

const ErrorCodes = {
  UserInputError: UserInputError,
  DuplicateUserError: DuplicateUserError,
  IncorrectConfirmPassword: IncorrectConfirmPassword
}

const getErrorCode = (code, ctx) => {
  return ErrorCodes[code] ? ErrorCodes[code](ctx) : null
}

export default getErrorCode
