const DuplicateUserError = (ctx) => {
  let error = {}

  if (ctx.key) {
    error = {
      message: `User with this ${ctx.key} already exists. Please try again with a different ${ctx.key}`,
      key: ctx.key
    }
  }

  return {
    code: 'DuplicateUserError',
    message: 'User already exists',
    error: error
  }
}

export default DuplicateUserError
