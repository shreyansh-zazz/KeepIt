import UserModel from '../../models/user.model'

const AuthenticationResolver = {
  Query: {
    login: () => ({
      success: 'Success'
    })
  },

  Mutation: {
    register: (parent, data, ctx) => {
      const user = new UserModel(data)

      var error = user.validateSync()
      if (error) {
        throw error
      }

      return {
        code: 201,
        success: true,
        message: 'User added succefully',
        user: {
          first_name: 'asdsad',
          last_name: 'adda',
          primary_email: 'asdasd'
        }
      }
    }
  }
}

export default AuthenticationResolver
