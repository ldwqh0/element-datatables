const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const config = require('./config')
const entries = require('../components.json')

const entriesToUse = Object.keys(entries).reduce((acc, cur) => ({
  ...acc, [cur]: path.resolve(__dirname, '../', entries[cur])
}), {})

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../', 'src/lib'),
    ...entriesToUse
  },
  module: {
    rules: [{
      test: /((m?j)|t)s$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../', 'src')
    }
  },
  optimization: {
    minimize: false
  },
  externals: {
    vue: 'vue',
    axios: 'axios',
    qs: 'qs',
    'vue-datalist': 'vue-datalist',
    'element-ui': 'element-ui',
    'element-ui/lib/row': 'element-ui/lib/row',
    'element-ui/lib/col': 'element-ui/lib/col',
    'element-ui/lib/table': 'element-ui/lib/table',
    'element-ui/lib/pagination': 'element-ui/lib/pagination',
    'element-ui/lib/loading': 'element-ui/lib/loading',
    ...config.externals
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  target: ['web'],
  output: {
    // library: 'element-datatables',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../', 'lib')
  }
}
