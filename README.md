# ele-data-tables
一个基于[element-ui](http://element.eleme.io)的表格组件,该组件封装了Ajax请求和分页,最初的灵感来自于[DataTables](https://www.datatables.net/),在项目中经过实践,有个这个组件的雏形.
* 需要手动引入[axios](https://github.com/axios/axios),[element-ui](http://element.eleme.io),[qs](https://github.com/ljharb/qs)库
* 由于[axios](https://github.com/axios/axios)依赖于Promise,因此如果要在IE9/IE10/IE11+上使用时,需要导入相应的polyfill,IE9-慎入  
代码中包含一个可运行的实例,通过下面的命令来启动实例
```
npm i && npm run dev
```
## 基本用法
* 安装相关依赖
```
npm i -S axios element-ui qs element-datatables
```
* 在项目中引入element-ui依赖,具体引入方式参见http://element.eleme.io.  
  你需要在你的入口文件中引入element相关的css文件.
* 通过以下两种方式之一展示数据
  * 通过ajax获取数据
```html
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
  import EleDataTables from 'element-datatables'
  import {TableColumn as ElTableColumn} from 'element-ui'
  export default {
    components: {
      EleDataTables,
      ElTableColumn
    },
    data () {      
    },
    methods: {
      op (value) {
        alert('你点击了' + JSON.stringify(value))
      }
    }
  }
</script>
```
  * 通过设置data属性获取数据
```html
<template>
  <div id="app">
    <h1>ele-data-tables</h1>
    <ele-data-tables :data="users" ref="renovate">
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
  import EleDataTables from 'element-datatables'
  import {TableColumn as ElTableColumn} from 'element-ui'
  export default {
    components: {
      EleDataTables,
      ElTableColumn
    },
    data () {   
        users: [{
            id:1,
            name:'张三'
        },{
            id:2,
            name:'李四'
        },{
            id:3,
            name:'王五'
        }]
    },
    methods: {
      op (value) {
        alert('你点击了' + JSON.stringify(value))
      }
    }
  }
</script>
```
有关el-table-column使用方法，请参考[element-ui](http://element.eleme.io/#/zh-CN/component/table)相关说明
## 其它table的高级功能
一些element-ui中table的高级功能，比如合并之类的，陆续开发中
## 简介
element-datatable支持两种模式的数据显示,一是ajax服务模式,二是data的本地数据模式.当我们设置组件的data属性时,会启用本地数据模式,否则会启用服务器模式.本组件的主要功能是服务器端模式,通过少量的代码,实现较为复杂的服务器分页查询等逻辑.
### 服务器模式  
当我们没有设置data的时候,组件启用服务器模式,我们可以通过设置服务器相关的参数来和从服务器获取数据.
#### 与服务器相关的属性
* ajax: 表示发送到服务器的请求,可以是一个字符串或者是一个完整的ajax对象.如果是一个字符串,则会向字符串指定的地址发送get请求以获取数据.本组件使用axios发送ajax请求,相关的ajax对象与[axios](https://github.com/axios/axios)的config相同
* server-params: 表示作为发送到服务器的附加参数,如果ajax请求的类型为get,则会将附件参数作为params发送到服务器,其它类型的请求会将数据作为data发送到服务器.
#### 发送到服务器的参数
这几个查询参数：包括{draw,page,size},将始终通过params的方式发送到服务器.  
* draw: 请求标记，服务器应该原样返回该数据
* page: 从0开始的分页号
* size: 每页长度
* server-params属性,在get请求时,会作为params发送到服务器,其它请求时会作为data发送到服务器  
一个示例地址：get http://localhost/users?draw=0&page=0&size=10&keywords=good
#### 服务器响应
为了正确展示数据，服务器必须按照一定的规则响应数据，组件需要如下响应才能正常工作
```typescript
{
  "draw": Number, // 服务器应当原样返回该标记，主要是做请求响应适配
  "success": Boolean, // 服务器是否正确的响应了查询
  "recordsTotal": Number, // 数据总量
  "error":String, // 错误信息，当success===true时，通常需要提供该信息，该信息会展示在表格中
  "data": Array //如果success===false,不需要该信息
}
```
以下是一个响应示例
```json
{
  "draw": 1,
  "success": true,
  "recordsTotal": 100,
  "data": [{
    "id":1,
    "name": "张三"
    },{
    "id":2,
    "name":"李四"
    },{
    "id":3,
    "name":"王五"
  }]
}
```
#### 数据过滤
当server-params改变时，会向服务器发送查询请求，并重新获取数据
### 本地数据
我们可以通过直接设置data属性来设置显示本地数据
## ele-data-tables属性说明
|属性名称|属性类型|属性描述|
| :- | :- | :- |
|ajax|String/Object|后台服务器地址/完整的ajax对象|
|server-params|Object|发送到服务器的查询参数|
|data|Array|静态数组|
## ele-data-tables实例方法
可供外部调用的实例方法有
* $refs.table.reloadData() 根据当前的信息重新载入数据
* 其它的实例方法不建议使用
## 更新历史
* 0.1.7
  功能，增加表头排序
* 0.1.3
  修正：当请求参数改变时，会回第一页了
* 0.1.1
  修正了一个引入element相关组件，在某些工程中编译报错的bug
* 0.1.0
  修正了一个切换每页长度后，表格不能正常刷新的bug,基本趋于稳定的一个版本了
* 0.0.6 
 修改依赖包的引入方式，修改IE兼容性问题
* 0.0.5  
  修改了显示加载动画的问题,
  增加了一个选项，用于控制是否显示加载对话框
* 0.0.4
  修改说明文件，修改说明示例,
  修改发布脚本
  增加事件响应
  增加分页项目配置
* 0.0.1-0.0.3
  初始版本
