/* eslint-disable no-undef */
// const rewire = require('rewire')
import AuthenticationResolver from './authentication.resolver'

const validateEmail = AuthenticationResolver.__GetDependency__('testing')

describe('authentication module', () => {
  describe('validation methods', () => {
    it('should validate email', () => {
      expect(validateEmail('email')).toBeTruthy()
    })
  })
})
