const axios = require('./static/myaxios')

axios({
    method: 'get',
    url: 'http://localhost:8000/myaxios'
}).then(res => {
    console.log(res)
})