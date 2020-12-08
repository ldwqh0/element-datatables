<template>
  <data-list ref="list"
             class="ele-data-tables"
             :data="data"
             :ajax="ajax"
             :server-params="serverParams"
             :save-state="saveState"
             :debounce-time="debounceTime"
             :sort="sort"
             :http="http">
    <template #list="{data}">
      <slot name="table" :data="data">
        <el-table :data="data">
          <slot name="default"/>
        </el-table>
      </slot>
    </template>
    <template #pagination="{pagination}">
      <slot name="pagination" :pagination="pagination">
        <el-pagination style="text-align: right" layout="sizes, prev, pager, next,total"
                       :total="pagination.total"
                       :page-size.sync="pagination.size"
                       :current-page.sync="pagination.page"/>
      </slot>
    </template>
  </data-list>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import ElTable from 'element-ui/lib/table'
import ElPagination from 'element-ui/lib/pagination'
import VLoading from 'element-ui/lib/loading'
import { DataList } from 'vue-datalist'

interface Sort {
  prop: string,
  order: string
}

interface Pagination {
  page: number,
  size: number,
  total: number,
}

interface AjaxFunction {
  (sererParams: any, pagination: Pagination, sort: Sort, draw: number): AxiosRequestConfig
}

export default Vue.extend({
  components: {
    DataList,
    ElTable,
    ElPagination,
  },
  directives: {
    'VLoading': VLoading
  },
  props: {
    data: {
      required: false,
      default: (): null => null,
      type: [Array] as PropType<any[] | null>
    },
    ajax: {
      required: false,
      default: (): null => null,
      type: [String, Object, Function] as PropType<string | AjaxFunction | AxiosRequestConfig | null>
    },
    serverParams: {
      required: false,
      default: () => ({}),
      type: [Object] as PropType<object>
    },
    /**
     * 一个axios的实例
     */
    http: {
      type: [Function] as PropType<AxiosInstance | null>,
      required: false,
      default: null
    },
    saveState: { // 是否保存表格状态
      required: false,
      default: () => false,
      type: [Boolean, String]
    },
    debounceTime: {
      required: false,
      type: [Number],
      default: () => 500
    }
  },
  methods: {
    reloadData () {
      (this.$refs.list as any).reloadData()
    }
  },
  data () {
    return {
      sort: {}
    }
  }
})
</script>
