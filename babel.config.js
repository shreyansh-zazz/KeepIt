const app = {
  environment: process.env.NODE_ENV
}

const plugins = () => {
  const plugins = [
    'import-graphql',
    '@babel/transform-runtime'
  ]

  if (app.environment === 'test') {
    plugins.push(['babel-plugin-rewire'])
  }

  return plugins
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
    plugins: plugins(),
    sourceMaps: 'both'
  }
}
