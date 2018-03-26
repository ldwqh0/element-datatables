<template>
  <div id="app">
    <h1>ele-data-tables</h1>
    <ele-data-tables :ajax="ajax" ref="renovate">
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a style="margin-right: 10px;cursor: pointer" @click="op(scope.row)" class="link">操作</a>
        </template>
      </el-table-column>
    </ele-data-tables>
  </div>
</template>

<script>
  import EleDataTables from './components'
  import {TableColumn as ElTableColumn} from 'element-ui'
  export default {
    components: {
      EleDataTables,
      ElTableColumn
    },
    data () {
      return {
        ajax: '/users'
      }
    },
    methods: {
      op (value) {
        alert('你点击了' + JSON.stringify(value))
      }
    }
  }
</script>
<style lang="less">

</style>
