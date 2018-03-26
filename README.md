# ele-data-tables
一个基于[element-ui](http://element.eleme.io)的表格组件,该组件封装了Ajax请求和分页，最初的灵感来自于[DataTables](https://www.datatables.net/),在项目中经过实践，有个这个组件的雏形.
* 需要手动引入[axios](https://github.com/axios/axios),[element-ui](http://element.eleme.io),[qs]()库
* 由于[axios](https://github.com/axios/axios)依赖于Promise，因此如果要在IE10/IE11+上使用时，需要导入相应的polyfill
## 