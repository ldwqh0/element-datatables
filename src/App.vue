<template>
  <el-container>
    <el-aside width="200px">
      <el-menu router>
        <el-menu-item index="1" route="/server">服务器数据</el-menu-item>
        <el-menu-item index="2" route="/local">本地数据</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>>
  </el-container>
</template>

<script>
  export default {
  }
</script>
<style lang="less">

</style>
