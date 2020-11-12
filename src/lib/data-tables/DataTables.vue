<template>
  <div class="data-tables">
    <slot name="table" :data="data_">
      <div class="data-tables-table">表格块</div>
    </slot>
    <slot name="pagination" :pagination="pagination">
      <div class="data-tables-pagination">分页块</div>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import qs from 'qs'
import config from './config'

interface Sort {
  prop: string,
  order: string
}

interface Response {
  size: number,
  totalElements: number,
  content: unknown[]
}

interface Pagination {
  page: number,
  size: number,
  total: number,
}

interface AjaxFunction {
  (sererParams: any, pagination: Pagination, sort: Sort, draw: number): AxiosRequestConfig
}

interface DataTables {
  draw: number,
  timeout: number | null,
  response: Response,
  pagination: Pagination
}

export default Vue.extend({
  props: {
    data: {
      required: false,
      type: [Array] as PropType<any[] | null>,
      default: (): any[] | null => null
    },
    http: {
      type: [Function] as PropType<AxiosInstance | null>,
      required: false,
      default: null
    },
    ajax: {
      required: false,
      default: null,
      type: [Object, String, Function] as PropType<string | AjaxFunction | AxiosRequestConfig | null>
    },
    serverParams: {
      required: false,
      default: (): any => ({}),
      type: [Object] as PropType<{ [key: string]: any }>
    },
    saveState: { // 是否保存表格状态
      required: false,
      default: (): boolean => false,
      type: [Boolean, String]
    },
    debounceTime: {
      required: false,
      type: [Number] as PropType<number>,
      default: (): number => 500
    },
    sort: {
      type: [Object] as PropType<Sort | null>,
      default: (): Sort => null,
      required: false
    }
  },
  data (): DataTables {
    return {
      timeout: null,
      draw: 0,
      response: {
        size: 10,
        totalElements: 0,
        content: []
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0,
      }
    }
  },
  computed: {
    sort_ (): string[] {
      if (this.sort !== undefined && this.sort !== null) {
        let { prop, order } = this.sort
        if (prop !== undefined) {
          if (order === 'ascending' || order === 'asc') {
            order = 'asc'
          }
          if (order === 'descending' || order === 'desc') {
            order = 'desc'
          }
          return [`${prop},${order}`]
        }
      }
      return []
    },
    data_ (): any[] {
      if (this.data !== null) {
        const total = this.pagination.total = this.data.length
        let max = this.pagination.size * this.pagination.page
        max = max > total ? total : max
        return this.data.slice((this.pagination.page - 1) * this.pagination.size, max)
      } else {
        return this.response.content
      }
    },
    params_ (): any {
      return {
        ...this.serverParams,
        page: this.pagination.page - 1,
        size: this.pagination.size,
        sort: this.sort_,
        draw: ++this.draw
      }
    },

    ajax_ (): AxiosRequestConfig | null {
      // 如果传入的ajax是一个函数，需要调用该函数构建ajax请求需要的对象
      if (this.ajax !== null) {
        if (typeof this.ajax === 'function') {
          return this.ajax(this.serverParams, this.pagination, this.sort, this.draw)
        } else if (typeof this.ajax === 'object') {
          const ajax = cloneDeep(this.ajax)
          if (ajax.params === undefined || ajax.params === null) {
            ajax.params = {}
          }
          ajax.params = {
            ...ajax.params,
            ...this.params_
          }
          return ajax
        } else if (typeof this.ajax === 'string') {
          return {
            url: this.ajax,
            method: 'get',
            params: this.params_,
            paramsSerializer: (v) => qs.stringify(v, { arrayFormat: 'repeat' })
          }
        }
      }
      return null
    }
  },
  methods: {
    reloadAjaxData (): void {
      if (this.ajax_ !== null) {
        const http = this.http || config.$http
        http.request(this.ajax_).then(({ data, config }) => {
          if (config.params.draw === this.draw) {
            this.response = data
            this.pagination.total = data.totalElements
          }
        })
      }
    },
    debounceReload () {
      if (this.timeout) {
        window.clearTimeout(this.timeout)
      }
      this.timeout = window.setTimeout(this.reloadAjaxData, this.debounceTime)
    }
  },
  watch: {
    ajax_ () {
      this.debounceReload()
    },
    serverParams () {
      this.pagination.page = 1
    },
    ajax () {
      this.pagination.page = 1
    }
  },
  created () {
    this.reloadAjaxData()
  }
})
</script>

<style scoped>

</style>
