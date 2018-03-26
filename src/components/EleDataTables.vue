<template>
  <div v-loading="loadingCount>0">
    <el-table :data="tableData">
      <slot>暂无数据</slot>
    </el-table>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  import { Row as ElRow, Col as ElCol, Table as ElTable, Pagination as ElPagination, Loading } from 'element-ui'
  const qs = require('qs')
  const $http = axios.create()

  // 由于axios中，对于对象的处理可能不太好，用QS翻译一下
  function transelateAjax (ajax) {
    let ajax_ = {...ajax}
    if (ajax.method === 'post') {
      ajax.data = ajax.params
      delete ajax.params
    }
    if (ajax.params) {
      if (qs) { // 如果qs库存在，将数据使用qs库转码
        let qs_ = qs.stringify(ajax.params, {arrayFormat: 'repeat'})
        ajax_.url = `${ajax_.url}?${qs_}`
        delete ajax_.params
      }
    }
    return ajax_
  }

  // let draw = 0 // 定义变量，标记draw
  /**
   * 一个表格组件，在组件内部实现分页和数据请求逻辑,
   * 如过你要在你的程序中设置表格条件，可以先设置serverParams,然后再设置ajax属性，这样就不会重复发送请求了
   */
  export default {
    components: {
      ElRow, ElCol, ElTable, ElPagination
    },
    directives: {
      Loading
    },
    props: {
      data: {
        default: () => null,
        type: Array
      },
      ajax: {
        default: () => null,
        type: [String, Object]
      },
      serverParams: {
        default: () => {},
        type: Object
      }
    },
    name: 'EleDataTables',
    data () {
      return {
        draw: 0,
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loadingCount: 0
      }
    },
    created () {
      // 载入数据
      this.reloadData()
    },
    computed: {},
    methods: {
      handleSizeChange (v) {
        this.reloadData()
      },
      handleCurrentChange (v) {
        this.reloadData()
      },
      reloadLocalData () {
        let total = this.total = this.data.length
        let max = this.pageSize * this.currentPage
        max = max > total ? total : max
        let result = []
        for (let i = (this.currentPage - 1) * this.pageSize; i < max; i++) {
          result.push(this.data[i])
        }
        this.$set(this, 'tableData', result)
      },
      reloadAjaxData () {
        let ajax = {
          url: '',
          method: 'get'
        }
        let draw = {draw: ++this.draw}
        if (typeof (this.ajax) === 'string') {
          ajax.url = this.ajax
          ajax.params = {...draw, ...this.serverParams, page: this.currentPage - 1, size: this.pageSize}
        } else {
          if (!this.ajax.url) {
            throw new Error('ajax url can not be empty')
          }
          ajax = {...ajax, ...this.ajax}// 如果ajax是个对象，进行合并
          // 无论如何，draw,page,size这三个参数一直作为params发送
          let params = {...draw, page: this.currentPage - 1, size: this.pageSize}
          ajax.params = {...params, ...this.ajax.params}

          if (ajax.method === 'post') {
            // 如果是post请求类型，将serverParams作为data发送
            ajax.data = {...this.serverParams, ...this.ajax.data}
          } else if (ajax.method === 'get') {
            // 如果是get请求,将数据作为params发送
            ajax.params = {...this.serverParams, ...this.ajax.params, ...params}
          }
        }
        if (!ajax.url) {
          console.debug('url不存在！不读取数据')
        } else {
          console.debug('ajax from url', ajax.url)
          this.loadingCount++
          $http(transelateAjax(ajax)).then(response => {
            response = response.data
            if (response.success && response.draw === this.draw) {
              this.total = response.recordsTotal
              this.tableData = response.data
            }
          }).catch(e => {
            console.error('从服务器获取数据时出错', e)
          }).finally(() => {
            this.loadingCount--
          })
        }
      },
      reloadData () {
        if (this.data) {
          this.reloadLocalData()
        } else if (this.ajax) {
          this.reloadAjaxData()
        }
      }
    },
    watch: {
      data () {
        this.reloadLocalData()
      },
      serverParams: {
        deep: true,
        handler (newVal, oldVal) {
          this.reloadAjaxData()
        }
      },
      ajax (newVal, oldVal) {
        this.reloadAjaxData()
      }
    }
  }
</script>
