const app = {
  environment: process.env.NODE_ENVIRONMENT,
  checkEnvironment: (envs) => {
    envs.forEach(env => {
      if (env !== process.env.NODE_ENVIRONMENT) {
        return false
      }
    })
    return true
  }
}

module.exports = api => {
  api.cache(false)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ]
    ],
    ignore: [
      '**/?(*.)+(spec|test).[tj]s?(x)',
      '**/__tests__/**/*.[jt]s?(x)',
      'build'
    ],
    plugins: [
      'import-graphql',
      '@babel/transform-runtime',
      app.checkEnvironment(['test', 'development']) ? ['babel-plugin-rewire'] : []
    ],
    sourceMaps: 'both'
  }
}
