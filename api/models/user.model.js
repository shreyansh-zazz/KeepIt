import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  first_name: {
    type: 'String',
    required: true,
    lowercase: true
  },

  last_name: {
    type: 'String',
    required: true,
    lowercase: true
  },

  primary_email: {
    type: 'String',
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: [new RegExp(/[a-z0-9\._%+!$&*=^|~#%{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,22})/), 'Invalid Email ID'],
    index: true,
    unique: true
  },

  username: {
    type: 'String',
    required: true,
    match: [new RegExp(/^[a-z0-9_-]{3,26}$/), 'Invalid Username! Allowed characters are: a-z, 0-9, - and _. Minimum length should be 3 and maximum length should be 26 character.'],
    index: true,
    unique: true
  },

  password: {
    type: 'String',
    required: true
  },

  role: {
    type: 'String',
    default: 'MEMBER',
    enum: ['MEMBER']
  },

  isActive: {
    type: 'bool',
    default: true
  },

  isVerified: {
    type: 'Boolean',
    default: false
  },

  createdOn: {
    type: 'Date',
    default: new Date().toJSON(),
    immutable: true
  },

  lastUpdatedOn: {
    type: 'Date',
    default: new Date().toJSON()
  }
})

const userModel = mongoose.model('User', userSchema)

export default userModel
