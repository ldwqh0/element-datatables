import Vue, { PluginObject } from 'vue'
import { AxiosInstance } from 'axios'

declare interface EleDataTablesOptions {
  httpInstance: AxiosInstance
}

declare class EleDataTables extends Vue {
  reloadData: () => void
}

declare const plugin: PluginObject<EleDataTablesOptions>

export { EleDataTables }
export default plugin
