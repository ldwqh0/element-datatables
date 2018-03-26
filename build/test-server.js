
const rspData = {
    success: false,
    recordsTotal: 101,
    error:'服务器读取数据错了',
    data: []
}

module.exports = (app) => {
    app.get("/users", (req, rsp) => {
        let { page, size, draw } = req.query
        let i = page * size
        rspData.data = []
        for (let j = 0; j < size; j++) {
            rspData.data.push({
                id: ++i,
                name: 'user' + i
            })
        }

        rsp.write(JSON.stringify({
            draw: +draw,
            ...rspData
        }))
        rsp.end();
    })
}