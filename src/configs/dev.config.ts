/**
 * 开发环境配置
 */

import { baseConfig }  from './base.config'
import { defaultsDeep } from 'lodash'

const devConf = {
  // api 配置
  api: {
    url: '/'
  },
}

defaultsDeep(devConf, baseConfig)

export {
  devConf
}