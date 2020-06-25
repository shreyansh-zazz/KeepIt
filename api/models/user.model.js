import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  first_name: {
    type: 'String',
    lowercase: true
  },

  last_name: {
    type: 'String',
    lowercase: true
  },

  primary_email: {
    type: 'String',
    // eslint-disable-next-line no-useless-escape
    match: [new RegExp(/[a-z0-9\._%+!$&*=^|~#%{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,22})/), 'Invalid Email ID']
  }
})

const userModel = mongoose.model('User', userSchema)

export default userModel
