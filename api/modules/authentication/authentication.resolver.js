import _ from 'lodash'
import bcrypt from 'bcrypt'
import Joi from '@hapi/joi'

import HandleError from '../../helpers/error-handler/error-handler'
import jwtHelper from '../../helpers/encrypt-decrypt/jwt'
import UserModel from '../../models/user.model'

const saltRounds = 10

const AuthenticationResolver = {
  Query: {
    validateEmail: async (parent, input, ctx) => {
      const isValidEmail = await Joi.string().email().validate(input.primary_email)
      if (isValidEmail.error) {
        return HandleError('UserInputError')
      }

      const userValidation = await isDuplicateEmail(input.primary_email)
      return {
        isValid: userValidation.isValid
      }
    },

    validateUsername: async (parent, { username }, ctx) => {
      const isValidUsername = await Joi.string().regex(/^[a-z0-9_-]{3,26}$/).validate(username)
      if (isValidUsername.error) {
        return HandleError('UserInputError')
      }

      const usernameValidation = await isDuplicateUsername(username)
      return {
        isValid: usernameValidation.isValid
      }
    }
  },

  Mutation: {
    login: async (parent, { input }, ctx) => {
      const isValidUsername = Joi.string().email().validate(input.username).error ? !Joi.string().regex(/^[a-z0-9_-]{3,26}$/).validate(input.username).error : true
      if (!isValidUsername) {
        return HandleError('UserInputError')
      }

      const isUserExist = await UserModel.findOne({ primary_email: input.primary_email })

      return isUserExist
    },

    register: async (parent, { input }, ctx) => {
      const user = new UserModel(input)

      try {
        const error = user.validateSync()
        if (error) {
          return HandleError('UserInputError', error)
        }

        const emailValidation = await isDuplicateEmail(input.primary_email)
        if (!emailValidation.isValid) {
          return emailValidation.error
        }

        const usernameValidation = await isDuplicateUsername(input.username)
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

        if (returnResponse.primary_email) {
          returnResponse.jwt = jwtHelper.getJWT(
            _.pick(returnResponse, ['primary_email', 'username', 'role', 'isActive', 'isVerified'])
          )
        }

        ctx.h.state('session', {
          refreshToken: await jwtHelper.getRefreshJWT(_.pick(returnResponse, ['primary_email', 'username', 'role', 'isActive', 'isVerified']))
        })

        return {
          user: _.pick(returnResponse, ['first_name', 'last_name', 'primary_email', 'username', 'role', 'isActive', 'isVerified']),
          jwt: returnResponse.jwt
        }
      } catch (err) {
        UserModel.deleteOne({ primary_email: input.primary_email }, (err) => {
          if (err) {
            console.log(err)
          }
        })
        return HandleError('UnexpectedError')
      }
    }
  }
}

async function isDuplicateEmail (email) {
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

async function isDuplicateUsername (username) {
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
