import _ from 'lodash'
import bcrypt from 'bcrypt'

import HandleError from '../../helpers/error-handler/error-handler'
import UserModel from '../../models/user.model'

const saltRounds = 10

const AuthenticationResolver = {
  Query: {
    login: () => ({
      success: 'Success'
    }),

    validateEmail: async (parent, { primaryEmail }, ctx) => {
      const emailValidation = await validateEmailForDuplication(primaryEmail)
      return {
        isValid: emailValidation.isValid
      }
    },

    validateUsername: async (parent, { username }, ctx) => {
      const usernameValidation = await validateUsernameForDuplication(username)
      return {
        isValid: usernameValidation.isValid
      }
    }
  },

  Mutation: {
    register: async (parent, { input }, ctx) => {
      const user = new UserModel(input)
      const error = user.validateSync()
      if (error) {
        return HandleError('UserInputError', error)
      }

      const emailValidation = await validateEmailForDuplication(input.primary_email)
      if (!emailValidation.isValid) {
        return emailValidation.error
      }

      const usernameValidation = await validateUsernameForDuplication(input.username)
      if (!usernameValidation.isValid) {
        return usernameValidation.error
      }

      if (input.password !== input.confirm_password) {
        return HandleError('IncorrectConfirmPassword')
      }

      const hashedPassword = await bcrypt.hash(input.password, saltRounds)
        .then((hash) => {
          if (!hash) {
            return HandleError('UnexpectedError')
          }
          return hash
        })
      user.password = hashedPassword

      const returnResponse = await user.save()
        .then((res) => {
          return res
        })

      return {
        code: 201,
        success: true,
        message: 'Registration successful',
        user: _.pick(returnResponse, ['first_name', 'last_name', 'primary_email', 'username', 'role', 'isActive', 'isVerified'])
      }
    }
  }
}

async function validateEmailForDuplication (email) {
  const isDuplicateEmailExists = await UserModel
    .findOne({ primary_email: email })
    .then((res) => {
      if (res && res.id) {
        return true
      }
      return false
    })
    .catch(err => {
      return err
    })

  if (isDuplicateEmailExists) {
    return { isValid: false, error: HandleError('DuplicateUserError', { key: 'Email Address' }) }
  }
  return { isValid: true, error: {} }
}

async function validateUsernameForDuplication (username) {
  const isDuplicateUsernameExists = await UserModel
    .findOne({ username: username })
    .then((res) => {
      if (res && res.id) {
        return true
      }
      return false
    })

  if (isDuplicateUsernameExists) {
    return { isValid: false, error: HandleError('DuplicateUserError', { key: 'Username' }) }
  }
  return { isValid: true, error: {} }
}

export default AuthenticationResolver
