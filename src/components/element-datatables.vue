<template>
  <div v-loading="showLoading && loadingCount > 0">
    <el-table :data="tableData" :height="height" :max-height="maxHeight" :stripe="stripe" :border="border" :size="size" :fit="fit" :show-header="showHeader" :highlight-current-row="highlightCurrentRow" :current-row-key="currentRowKey" :row-class-name="rowClassName" :row-style="rowStyle" :cell-class-name="cellClassName" :cell-style="cellStyle" :header-row-class-name="headerRowClassName" :header-row-style="headerRowStyle" :header-cell-class-name="headerCellClassName" :header-cell-style="headerCellStyle" :row-key="rowKey" :empty-text="emptyText" :default-expand-all="defaultExpandAll" :expand-row-keys="expandRowKeys" :default-sort="defaultSort" :tooltip-effect="tooltipEffect" :show-summary="showSummary" :sum-text="sumText" :summary-method="summaryMethod" :span-method="spanMethod" :select-on-indeterminate="selectOnIndeterminate" @select="onSelect" @select-all="onSelectAll" @selection-change="onSelectionChange" @cell-mouse-enter="onCellMouseEnter" @cell-mouse-leave="onCellMouseLeave" @cell-click="onCellClick" @cell-dblclick="onCellDblclick" @row-click="onRowClick" @row-contextmenu="onRowContextmenu" @row-dblclick="onRowDblclick" @header-click="onHeaderClick" @header-contextmenu="onHeaderContextmenu" @sort-change="onSortChange" @filter-change="onFilterChange" @current-change="onCurrentRowChange" @header-dragend="onHeaderDragend" @expand-change="onExpandChange" ref="table">
      <slot name="first" />
      <el-column v-for="(item, index) in columnAttributes" :key="index" :selectable="selectable" :item="item" />
      <slot name="last" />
      <slot />
    </el-table>
    <el-pagination :small="small" :background="background" :page-size="pageSize" :total="total" :page-count="pageCount" :pager-count="pagerCount" :current-page="currentPage" :layout="layout" :page-sizes="pageSizes" :popper-class="popperClass" :prev-text="prevText" :next-text="nextText" :disabled="disabled" @size-change="onSizeChange" @current-change="onCurrentChange" @prev-click="onPrevClick" @next-click="onNextClick" />
  </div>
</template>

<script>
import axios from "axios"
import ElColumn from './el-column'

const qs = require("qs")
const $http = axios.create({
  timeout: 120000
})

// 处理URL
function translateAjax(ajax) {
  let ajax_ = Object.assign({}, ajax)
  if (ajax.method.toLowerCase() === 'post') {
    ajax.data = Object.assign({}, ajax.params, ajax.data)
    delete ajax.params
  }

  if (ajax.params && qs) {
    let qs_ = qs.stringify(ajax.params, { arrayFormat: 'repeat' })
    ajax_.url = `${ajax_.url}?${qs_}`
    delete ajax_.params
  }

  return ajax_
}

export default {
  name: "ElementDatatables",

  components: {
    ElColumn
  },

  props: {
    ajax: { // 传ajax获取服务器数据
      type: [String, Object],
      default: () => null
    },
    serverParams: { // 查询参数
      type: Object
    },
    showLoading: { // 是否显示加载
      type: Boolean,
      default: () => true
    },
    columnAttributes: { // 指定表格属性
      type: Array,
      default: () => []
    },
    checkedProp: { // 当type为selection时有效，指定默认选中属性
      type: [String, Function],
      default: () => ''
    },
    selectAbleProp: { // type为selection时有效能否选择
      type: String
    },

    // el-table 属性
    data: {
      type: Array,
      default: () => null
    },
    height: {
      type: [Number, String]
    },
    maxHeight: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: () => false
    },
    border: {
      type: Boolean,
      default: () => true
    },
    size: {
      type: String
    },
    fit: {
      type: Boolean,
      default: () => true
    },
    showHeader: {
      type: Boolean,
      default: () => true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: () => false
    },
    currentRowKey: {
      type: [String, Number]
    },
    rowClassName: {
      type: [Function, String]
    },
    rowStyle: {
      type: [Function, Object]
    },
    cellClassName: {
      type: [Function, String]
    },
    cellStyle: {
      type: [Function, Object]
    },
    headerRowClassName: {
      type: [Function, String]
    },
    headerRowStyle: {
      type: [Function, Object]
    },
    headerCellClassName: {
      type: [Function, String]
    },
    headerCellStyle: {
      type: [Function, Object]
    },
    rowKey: {
      type: [Function, String]
    },
    emptyText: {
      type: String
    },
    defaultExpandAll: {
      type: Boolean,
      default: () => false
    },
    expandRowKeys: {
      type: Array
    },
    defaultSort: {
      type: Object
    },
    tooltipEffect: {
      type: String
    },
    showSummary: {
      type: Boolean,
      default: () => false
    },
    sumText: {
      type: String,
      default: () => '合计'
    },
    summaryMethod: {
      type: Function
    },
    spanMethod: {
      type: Function
    },
    selectOnIndeterminate: {
      type: Boolean,
      default: () => true
    },

    // el-pagination 属性
    small: {
      type: Boolean,
      default: () => false
    },
    background: {
      type: Boolean,
      default: () => false
    },
    // pageSize: {
    //   type: Number,
    //   default: () => 10
    // },
    // total: {
    //   type: Number,
    //   default: () => null
    // },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      default: () => 7
    },
    // currentPage: {
    //   type: Number,
    //   default: () => 1
    // },
    layout: {
      type: String,
      default: () => "total, sizes, prev, pager, next, jumper"
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100]
    },
    popperClass: {
      type: String
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },

  data() {
    return {
      draw: 0,
      tableData: [],
      currentPage: 1,
      currentPage_: 1,
      pageSize: 10,
      total: 0,
      loadingCount: 0,
      success: true,
      errorMsg: "error",
      maxColumnIndex: 0
    }
  },

  created() {
    this.$nextTick(() => {
      this.reloadData()
    })
  },

  watch: {
    data: {
      handler(val) {
        // this.loadLocalData()
      },
      deep: true,
      immediate: true
    },
    serverParams: {
      handler(val) {
        this.currentPage_ = 1
        // this.loadAjaxData()
      },
      deep: true,
      immediate: true
    },
    ajax: {
      handler(val) {
        this.currentPage_ = 1
        // this.loadAjaxData()
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    // 加载数据
    reloadData() {
      if (this.currentPage !== this.currentPage_) {
        this.currentPage = this.currentPage_
      }
      if (this.data) {
        this.loadLocalData()
      } else if (this.ajax) {
        this.loadAjaxData()
      }
    },

    // 加载本地数据
    loadLocalData() {
      let total = (this.total = this.data.length)
      let max = this.pageSize * this.currentPage
      max = max > total ? total : max
      let result = []
      for (let i = (this.currentPage - 1) * this.pageSize; i < max; i++) {
        result.push(this.data[i])
      }
      this.$set(this, "tableData", result)
      this.$nextTick(() => {
        this.defaultChecked()
      })
    },

    // 加载服务器数据
    loadAjaxData() {
      let ajax = {
        url: '',
        method: 'get' // 默认get请求方式
      }
      let draw = { draw: ++this.draw }

      // 改造ajax参数
      if (typeof (this.ajax) === 'string') { // String 类型,只有get请求方式
        ajax.url = this.ajax
        ajax.params = Object.assign({}, { pageIndex: this.currentPage, pageSize: this.pageSize }, draw, this.serverParams)
      } else { // Object 类型, 默认get请求方式
        if (!this.ajax.url) {
          throw new Error('url can not be empty!')
        }
        ajax = Object.assign({}, ajax, this.ajax)
        if (ajax.method.toLowerCase() === 'get') { // get请求
          ajax.params = Object.assign({}, { pageIndex: this.currentPage, pageSize: this.pageSize }, draw, this.ajax.params, this.serverParams)
        } else { // post 请求
          ajax.data = Object.assign({}, { pageIndex: this.currentPage, pageSize: this.pageSize }, draw, this.ajax.params, this.ajax.data, this.serverParams)
        }
      }

      if (!ajax.url) {
        throw new Error('url can not be empty!')
      } else {
        this.loadingCount++
        $http(translateAjax(ajax)).then(res => {
          if (res.data.success || res.data.code == '200') { // 返回成功
            this.tableData = res.data.data.tbody || []
            this.total = res.data.data.page ? res.data.data.page.count : res.data.data.realCount
            this.$nextTick(() => {
              this.defaultChecked()
            })
            this.loadingCount = 0;
          } else { // 返回失败
            this.loadingCount = 0;
          }
        }).catch(error => {
          // let res = error.response;
          // let configData = JSON.parse(res.config.data);
          // let message = '代码：' + res.data.status + '</br>消息：' + res.data.message + '</br>' + configData['target_name'];
          // this.$notify.error({
          //   title: '错误',
          //   message,
          //   dangerouslyUseHTMLString: true
          // });
          // this.loadingCount = 0;
          throw new Error(error);
        })
      }
    },

    // 默认选中
    defaultChecked() {
      if (this.checkedProp) {
        if (typeof (this.checkedProp) === 'string') { // 传入的是字符串
          if (this.tableData.length) {
            this.tableData.forEach((item, index) => {
              this.$refs.table.toggleRowSelection(
                this.tableData[index],
                item[this.checkedProp] || false
              )
            })
          }
        } else { // 传入的是函数
          if (this.tableData.length) {
            this.tableData.forEach((item, index) => {
              this.$refs.table.toggleRowSelection(this.tableData[index], this.checkedProp(item, index))
            })
          }
        }
      }

    },

    // 是否可选, 也可以直接在column-attributes里面直接传入
    selectable(row, index) {
      if (this.selectAbleProp && !row[this.selectAbleProp]) {
        return false
      }
      return true
    },

    /*  表格事件  */
    onSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    onSelectAll(selection) {
      this.$emit("select-all", selection)
    },
    onSelectionChange(selection) {
      this.$emit("selection-change", selection)
    },
    onCellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    onCellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    onCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    onCellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    onRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    onRowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    onRowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
    onHeaderClick(column, event) {
      this.$emit('header-click', column, event)
    },
    onHeaderContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    onSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    onFilterChange(filters) {
      this.$emit('filter-change', filters)
    },
    onCurrentRowChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    onHeaderDragend(newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event)
    },
    onExpandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
    },

    /*  分页器事件  */
    onSizeChange(size) {
      this.pageSize = size
      this.reloadData()
    },

    onCurrentChange(page) {
      this.currentPage = page
      this.currentPage_ = page
      this.reloadData()
    },

    onPrevClick(currentPage) {
      this.currentPage = currentPage
      this.currentPage_ = currentPage
      this.reloadData()
    },

    onNextClick(currentPage) {
      this.currentPage = currentPage
      this.currentPage_ = currentPage
      this.reloadData()
    }
  }
}
</script>

<style>
.el-table {
  margin-bottom: 8px;
}
</style>
