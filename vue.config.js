const testServer = require('./config/test-server')

module.exports = {
  assetsDir: process.env.ASSETS_DIR,
  publicPath: process.env.CONTEXT_PATH,
  devServer: {
    port: 8080,
    before: testServer
  },
  configureWebpack: {
    entry: ['core-js/stable', 'regenerator-runtime/runtime', './src']
  }
}
