const Components = require('../components.json')

const externals = {}
Object.keys(Components).forEach(key => {
    externals[`@/lib/${key}`] = `ele-data-tables/lib/${key}`
})

exports.externals = externals
