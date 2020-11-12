<template>
  <div id="app">
    <h1>ele-data-tables</h1>
    <el-form :model="serverParams">
      <el-form-item>
        <el-input v-model="serverParams.keywords"/>
      </el-form-item>
    </el-form>
    <ele-data-tables ajax="/users" ref="renovate" @selection-change="handleSelectionChange"
                     :server-params="serverParams">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id"
                       label="ID"
                       align="center"
                       sortable="custom"/>
      <el-table-column prop="name" label="姓名" sortable="custom"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a style="margin-right: 10px;cursor: pointer" @click="op(scope.row)" class="link">操作</a>
        </template>
      </el-table-column>
    </ele-data-tables>
  </div>
</template>
<script lang="ts">
// import { EleDataTables } from '../lib'
import { TableColumn as ElTableColumn } from 'element-ui'

export default {
  components: {
    // EleDataTables,
    ElTableColumn
  },
  methods: {
    op (value: any) {
      alert('你点击了' + JSON.stringify(value))
    },

    handleSelectionChange (val: any) {
      // this.multipleSelection = val
    }
  },
  data () {
    return {
      serverParams: {
        keywords: ''
      }
    }
  }
}
</script>
