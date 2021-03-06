import { setupTestConfigs } from '../../config/test-config/test-setup'
import HandleError from '../../helpers/error-handler/error-handler'
import AuthenticationResolver from './authentication.resolver'
import UserModel from '../../models/user.model'

const isDuplicateEmail = AuthenticationResolver.__GetDependency__('isDuplicateEmail')
const isDuplicateUsername = AuthenticationResolver.__GetDependency__('isDuplicateUsername')

const jestUserData = {
  first_name: 'Jest',
  last_name: 'Tester',
  primary_email: 'jest@keepit.com',
  username: 'jest_tester',
  password: 'password',
  confirm_password: 'password'
}

describe('authentication module', () => {
  setupTestConfigs('authentication')

  describe('validation methods tests', () => {
    it('should validate email to true', async () => {
      const isValid = await isDuplicateEmail('jest@keepit.com')
      expect(isValid.isValid).toBeTruthy()
    })

    it('should validate email to false', async () => {
      const addUserJest = new UserModel(jestUserData)
      const res = await addUserJest.save()
        .then(data => data)

      if (!res || !res._id) {
        throw new Error('Couldn\'t save user in database.')
      }

      const isValid = await isDuplicateEmail('jest@keepit.com')
      expect(isValid.isValid).toBeFalsy()
    })

    it('should validate username to true', async () => {
      const isValid = await isDuplicateUsername('jest_tester')
      expect(isValid.isValid).toBeTruthy()
    })

    it('should validate username to false', async () => {
      const addUserJest = new UserModel(jestUserData)
      const res = await addUserJest.save()
        .then(data => data)

      if (!res || !res._id) {
        throw new Error('Couldn\'t save user in database.')
      }

      const isValid = await isDuplicateUsername('jest_tester')
      expect(isValid.isValid).toBeFalsy()
    })
  })

  describe('authentication validation queries resolver tests', () => {
    it('should validate validateEmail query', async () => {
      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: true }))
      const res = await AuthenticationResolver.Query.validateEmail(null, { primaryEmail: 'jest@keepit.com' }, null)
      expect(res.isValid).toBeTruthy()
    })

    it('should validate validateUsername query', async () => {
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: true }))
      const res = await AuthenticationResolver.Query.validateUsername(null, { username: 'jest_tester' }, null)
      expect(res.isValid).toBeTruthy()
    })
  })

  describe('authentication register mutation resolver test', () => {
    it('should register a new user successfully', async () => {
      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: true }))
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: true }))

      const ctx = { h: { state: jest.fn() } }
      const res = await AuthenticationResolver.Mutation.register(null, { input: jestUserData }, ctx)

      expect(res.user.primary_email).toBeTruthy()
    })

    it('should throw unxpected error and delete user if saved', async () => {
      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: true }))
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: true }))

      const res = await AuthenticationResolver.Mutation.register(null, { input: jestUserData }, null)
      const user = await UserModel.find({ primary_email: jestUserData.primary_email })
      expect(res.extensions.code).toMatch(/INTERNAL_SERVER_ERROR/)
      expect(user.length).toBeFalsy()
    })

    it('should throw error when confirm_password doesn\'t match', async () => {
      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: true }))
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: true }))
      const input = jestUserData
      input.confirm_password = 'random'
      const res = await AuthenticationResolver.Mutation.register(null, { input: input }, null)
      expect(res.extensions.code).toMatch(/IncorrectConfirmPassword/)
    })

    it('should throw error when wrong input provided', async () => {
      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: true }))
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: true }))
      const input = { ...jestUserData }
      input.primary_email = 'notAValidEmail'
      const res = await AuthenticationResolver.Mutation.register(null, { input: input }, null)
      expect(res.extensions.code).toMatch(/UserInputError/)
    })

    it('should throw error when duplicate user exists', async () => {
      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: false, error: HandleError('DuplicateUserError', { key: 'Email Address' }) }))
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: true }))

      let res = await AuthenticationResolver.Mutation.register(null, { input: jestUserData }, null)
      expect(res.extensions.code).toMatch(/DuplicateUserError/)

      AuthenticationResolver.__set__('isDuplicateEmail', () => Promise.resolve({ isValid: true }))
      AuthenticationResolver.__set__('isDuplicateUsername', () => Promise.resolve({ isValid: false, error: HandleError('DuplicateUserError', { key: 'Username' }) }))

      res = await AuthenticationResolver.Mutation.register(null, { input: jestUserData }, null)
      expect(res.extensions.code).toMatch(/DuplicateUserError/)
    })
  })
})
