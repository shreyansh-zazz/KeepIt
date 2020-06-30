const app = {
  environment: process.env.NODE_ENVIRONMENT,
  checkEnvironment: (envs) => {
    envs.forEach(env => {
      if (env !== process.env.NODE_ENVIRONMENT) {
        return false
      }
    });
    return true
  }
}

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "ignore": [
    "build"
  ],
  "plugins": [
    "import-graphql",
    "@babel/transform-runtime",
    app.checkEnvironment(['test', 'development']) ? ['babel-plugin-rewire'] : []
  ],
  "sourceMaps": "both"
}
