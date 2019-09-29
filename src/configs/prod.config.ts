/**
 * 生产环境配置
 */

import { baseConfig } from './base.config'
import { defaultsDeep } from 'lodash'

const prodConf = {
  api: {
    url: '' //线上域名
  },
}

defaultsDeep(prodConf, baseConfig)

export {
  prodConf
}