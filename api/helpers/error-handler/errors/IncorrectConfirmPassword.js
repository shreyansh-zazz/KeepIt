const IncorrectConfirmPassword = (ctx) => {
  return {
    code: 'IncorrectConfirmPassword',
    message: 'Incorrect confirm password. Please try again.',
    error: ctx
  }
}

export default IncorrectConfirmPassword
