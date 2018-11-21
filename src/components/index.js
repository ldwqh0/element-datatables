'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _EleDataTables = require('./EleDataTables')

var _EleDataTables2 = _interopRequireDefault(_EleDataTables)

var _config = require('./config')

var _config2 = _interopRequireDefault(_config)

var _axios = require('axios')

var _axios2 = _interopRequireDefault(_axios)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

_EleDataTables2.default.install = function (Vue, _ref) {
  var _ref$httpInstance = _ref.httpInstance,
    httpInstance = _ref$httpInstance === undefined ? _axios2.default.create() : _ref$httpInstance

  _config2.default.$http = httpInstance
  Vue.component('EleDataTables', _EleDataTables2.default)
}
exports.default = _EleDataTables2.default
