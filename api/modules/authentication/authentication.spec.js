import { setupDB } from '../../config/test-config/database'
import AuthenticationResolver from './authentication.resolver'
import UserModel from '../../models/user.model'

const validateEmailForDuplication = AuthenticationResolver.__GetDependency__('validateEmailForDuplication')
const validateUsernameForDuplication = AuthenticationResolver.__GetDependency__('validateUsernameForDuplication')

const jestUserData = {
  first_name: 'Jest',
  last_name: 'Tester',
  primary_email: 'jest@keepit.com',
  username: 'jest_tester',
  password: 'password'
}

describe('authentication module', () => {
  setupDB('authentication')

  describe('validation methods', () => {
    it('should validate email to true', async () => {
      const isValid = await validateEmailForDuplication('jest@keepit.com')
      expect(isValid.isValid).toBeTruthy()
    })

    it('should validate email to false', async () => {
      const addUserJest = new UserModel(jestUserData)
      const res = await addUserJest.save()
        .then(data => data)

      if (!res || !res._id) {
        throw new Error('Couldn\'t save user in database.')
      }

      const isValid = await validateEmailForDuplication('jest@keepit.com')
      expect(isValid.isValid).toBeFalsy()
    })

    it('should validate username to true', async () => {
      const isValid = await validateUsernameForDuplication('jest_tester')
      expect(isValid.isValid).toBeTruthy()
    })

    it('should validate username to false', async () => {
      const addUserJest = new UserModel(jestUserData)
      const res = await addUserJest.save()
        .then(data => data)

      if (!res || !res._id) {
        throw new Error('Couldn\'t save user in database.')
      }

      const isValid = await validateUsernameForDuplication('jest_tester')
      expect(isValid.isValid).toBeFalsy()
    })
  })
})
