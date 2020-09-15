import Vue from 'vue'
import { AxiosInstance } from 'axios'

declare interface EleDataTablesOptions {
  httpInstance: AxiosInstance
}

declare class EleDataTables extends Vue {
  static install (vue: typeof Vue, options?: EleDataTablesOptions): void
}

export default EleDataTables
