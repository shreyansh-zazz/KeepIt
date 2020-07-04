import _ from 'lodash'

import dbConfigs from './database'
import envConfigs from './env'

export default _.merge(envConfigs, dbConfigs)
