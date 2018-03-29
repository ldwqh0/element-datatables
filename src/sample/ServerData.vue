<template>
  <div id="app">
    <h1>ele-data-tables</h1>
    <ele-data-tables ajax="/users" ref="renovate">
      <el-table-column prop="id" label="ID" align="center"/>
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
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import EleDataTables from '../components'
  import {TableColumn as ElTableColumn} from 'element-ui'
  @Component({
      components: {
          EleDataTables,
          ElTableColumn
      }
  })
  export default class ServerData extends Vue {
    op (value) {
      alert('你点击了' + JSON.stringify(value))
    }
  }
</script>
