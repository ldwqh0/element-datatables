import { EleDataTables } from '@/lib/ele-data-tables'
import { config, DataList } from 'vue-datalist'
import axios from 'axios'
import _Vue from 'vue'

export { EleDataTables, DataList, config }

export default {
  install (Vue: typeof _Vue, { httpInstance } = { httpInstance: axios.create() }) {
    config.httpInstance = httpInstance
    Vue.component('EleDataTables', EleDataTables)
  }
}

