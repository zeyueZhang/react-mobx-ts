/**
 * 生产环境配置
 */

import baseConf from './base.config'
import { defaultsDeep } from 'lodash'

const prodConf = {
  api: {
    url: '' //线上域名
  },
}

defaultsDeep(prodConf, baseConf)

export default prodConf