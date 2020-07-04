import _ from 'lodash'

describe('configuration', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should provide configurations for development environment', async () => {
    process.env.NODE_ENV = 'development'
    const devConfig = await require('./config').default
    expect(devConfig.IS_DEV).toBeTruthy()
    expect(devConfig.DB.name).not.toMatch(/jest/)
  })

  it('should provide configurations for test environment', async () => {
    process.env.NODE_ENV = 'test'
    const testConfig = _.cloneDeep(require('./config').default)
    expect(await testConfig.IS_TEST).toBeTruthy()
    expect(await testConfig.DB.name).toMatch(/jest/)
  })

  it('should provide configurations for production environment', async () => {
    process.env.NODE_ENV = 'production'
    const prodConfig = _.cloneDeep(require('./config').default)
    expect(await prodConfig.IS_PROD).toBeTruthy()
    expect(await prodConfig.DB.name).not.toMatch(/jest/)
  })
})
