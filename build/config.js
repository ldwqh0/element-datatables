const Components = require('../components.json')

const externals = {}
Object.keys(Components).forEach(key => {
  externals[`@/lib/${key}`] = `element-datatables/lib/${key}`
})

exports.externals = externals
