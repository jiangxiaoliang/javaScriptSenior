const http = require('http')

const serve = http.createServer((req, res) => {
    res.end('hello node11122')
})

serve.listen(3000)