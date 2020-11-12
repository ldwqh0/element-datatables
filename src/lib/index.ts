import { EleDataTables } from '@/lib/ele-data-tables'
import { config, DataTables } from '@/lib/data-tables'
import axios from 'axios'
import _Vue from 'vue'

export { EleDataTables, DataTables }

export default {
  install (Vue: typeof _Vue, { httpInstance = axios.create() } = {}) {
    config.$http = httpInstance
    Vue.component('EleDataTables', EleDataTables)
  }
}

