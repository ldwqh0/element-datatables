<template>
  <div id="app">
    <h1>ele-data-tables</h1>
    <ele-data-tables :ajax="ajax" ref="renovate">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="describe" label="说明"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a style="margin-right: 10px;cursor: pointer" @click="upMove(scope.row.id)" class="link">上移</a>
          <a style="margin-right: 10px;cursor: pointer" @click="downs(scope.row.id)" class="link">下移</a>
          <a style="margin-right: 10px;cursor: pointer" @click="openDialog(scope.row)" class="link">编辑</a>
          <a style="cursor: pointer" @click="deletes(scope.row.id)" class="link">删除</a>
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
        tableUrl: '/w/label',
        ajax: {
          url: '/w/label',
          method: 'post',
          data: {
            age: 12
          }
        }
      }
    }
  }
</script>
<style lang="less">

</style>
