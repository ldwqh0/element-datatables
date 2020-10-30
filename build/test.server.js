// const rspData = {
//   error: '服务器读取数据错了',
//   data: []
// }
// 错误信息的范本
const error = {
  'timestamp': '2020-01-12T13:13:03.581+0000',
  'status': 400,
  'error': 'Bad Request',
  'message': 'Failed to convert value of type \'java.lang.String\' to required type \'java.lang.Long\'; nested exception is java.lang.NumberFormatException: For input string: "g"',
  'path': '/users/g'
}

module.exports = (app) => {
  app.get('/users', (req, rsp) => {
    let { page, size } = req.query
    let i = page * size
    let content = []
    for (let j = 0; j < size; j++) {
      content.push({
        id: ++i,
        name: 'user' + i
      })
    }
    // rsp.statusCode = 400
    // rsp.write(JSON.stringify(error))
    rsp.write(JSON.stringify({
      totalElements: 100,
      content
    }))
    rsp.end()
  })
}
