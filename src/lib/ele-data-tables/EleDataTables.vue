<template>
  <data-list ref="list"
             class="ele-data-tables"
             :data="data"
             :ajax="ajax"
             :server-params="serverParams"
             :save-state="saveState"
             :debounce-time="debounceTime"
             :sort="sortToUse"
             :http="http">
    <template #list="{data}">
      <slot name="table" :data="data">
        <el-table :data="data"
                  @selection-change="selectionChange"
                  @cell-click="cellClick"
                  @row-click="rowClick"
                  @sort-change="sortChange">
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
    order?: 'ascending' | 'asc' | 'descending' | 'desc' | null
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
      },
      sort: {
        required: false,
        default: () => ({}),
        type: [Object, Array] as PropType<Sort | Sort[]>
      }
    },
    methods: {
      reloadData () {
        (this.$refs.list as any).reloadData()
      },
      selectionChange (selection: any) {
        this.$emit('selection-change', selection)
      },
      cellClick (row: any, column: any, cell: any, event: any) {
        this.$emit('cell-click', row, column, cell, event)
      },
      rowClick (row: any, column: any, event: any) {
        this.$emit('row-click', row, column, event)
      },
      // 重新配置排序字段
      resetSort ({ prop, order }: Sort) {
        const extIdx = this.sorts.findIndex(s => s.prop === prop)
        if (order === undefined || order === null) {
          if (extIdx > -1) {
            this.sorts.splice(extIdx, 1)
          }
        } else {
          if (extIdx > -1) {
            this.sorts[extIdx].order = order
          } else {
            this.sorts.push({ prop, order })
          }
        }
      },
      sortChange (event: any) {

        if (this.data && this.data.length > 0) {
          // 如果是本地数据，不进行特殊处理
        } else {
          this.resetSort(event)
          // 如果是服务端数据，重新加载数据
          this.reloadData()
        }
        this.$emit('sort-change', event)
      }
    },
    computed: {
      sortToUse (): Sort[] {
        const result: Sort[] = []
        if (Array.isArray(this.sort)) {
          result.push(...this.sort)
        } else {
          result.push(this.sort as Sort)
        }
        result.push(...this.sorts)
        return result
      }
    },
    data () {
      const data: { sorts: Sort[] } = {
        sorts: []
      }
      return data
    }
  })
</script>
