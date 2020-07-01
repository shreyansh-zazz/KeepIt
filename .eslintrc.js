module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  plugins: ['jest'],
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
  }
}
