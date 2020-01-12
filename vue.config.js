module.exports = {
  assetsDir: process.env.ASSETS_DIR,
  publicPath: process.env.CONTEXT_PATH,
  devServer: {
    port: 80
  },
  configureWebpack: {
    entry: ['core-js/stable', 'regenerator-runtime/runtime', './src']
  }
}
