import { config, EleDataTables } from '@/lib/ele-data-tables'
import axios from 'axios'

export { EleDataTables }

export default {
  install (Vue, { httpInstance = axios.create() } = {}) {
    config.$http = httpInstance
    Vue.component('EleDataTables', EleDataTables)
  }
}

