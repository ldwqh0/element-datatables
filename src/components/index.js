import EleDataTables from './EleDataTables.vue'
import config from './config.js'
import axios from 'axios'

EleDataTables.install = function (Vue, { httpInstance = axios.create() } = {}) {
  config.$http = httpInstance
  Vue.component('EleDataTables', EleDataTables)
}
export default EleDataTables
