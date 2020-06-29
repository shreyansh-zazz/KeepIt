const UserInputError = (ctx) => {
  return {
    code: 'UserInputError',
    message: 'User input validation failed',
    error: ctx
  }
}

export default UserInputError
