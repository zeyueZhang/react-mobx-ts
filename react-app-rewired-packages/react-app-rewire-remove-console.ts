const rewireRemoveConsole = () => {
  // remove console.log
  let removeConsoleConfig = {}
  if (process.env.NODE_ENV === 'production') {
    removeConsoleConfig = ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
  }

  return removeConsoleConfig
}

module.exports = rewireRemoveConsole