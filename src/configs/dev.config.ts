/**
 * 开发环境配置
 */

import baseConf from './base.config'
import { defaultsDeep } from 'lodash'

const devConf = {
  // api 配置
  api: {
    url: '/'
  },
}

defaultsDeep(devConf, baseConf)

export default devConf