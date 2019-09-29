/**
 * 导出配置
 */
import {devConf} from './dev.config';
import {prodConf} from './prod.config';

let config: any
const env = process.env.NODE_ENV
if (env === 'development') {
  config = devConf
} else {
  config = prodConf
}

export {
  config
}