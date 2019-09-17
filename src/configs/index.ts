/**
 * 导出配置
 */

let config = ''
const env = process.env.NODE_ENV
if (env === 'development') {
  config = require('./dev.config')
} else {
  config = require('./prod.config')
}

export default config