class Axios {
    constructor() {
        this.test = 'a'
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        }
        this.adapter = new Adapter()
    }
    request(config) {
        // 组装队列
        let chain = [this.dispatchXhr.bind(this), undefined]
        this.interceptors.request.handles.forEach(interceptor => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected)
        })
        this.interceptors.response.handles.forEach(interceptor => {
            chain.push(interceptor.fulfilled, interceptor.rejected)
        })
        let promise = Promise.resolve(config)
        while(chain.length > 0) {
            promise = promise.then(chain.shift(), chain.shift())
        }
        return promise

        // [ful1,rej1,ful2,rej2,this.xhr,undefined,ful1,rej1,ful2,rej2]
        // return this.xhr(config)
    }
    dispatchXhr(config) {
        // 判断环境
        if (typeof process !== 'undefined') {
            // 服务端
            return this.adapter.http(config)
        } else {
            // 客户端
            return this.adapter.xhr(config)
        }
    }
}

class InterceptorManager {
    constructor() {
        this.handles = []
    }
    use(fulfilled, rejected) {
        this.handles.push({
            fulfilled,
            rejected
        })
    }
}

// 适配器
class Adapter {
    http(config) {
        console.log('nodejs')
        return new Promise((resolve, reject) => {
            const http = require('http')
            const urls = require('url')
            let { data = null, url, method = 'get', params, headers = {} } = config;
            let pathObj = urls.parse(url)
            let options = {
                host: pathObj.hostname,
                port: pathObj.port,
                path: pathObj.path,
                method: config.method.toUpperCase(),
                headers: headers
            };
            let request = http.request(options, res => {
                let result = ''
                res.on('data', chunk => {
                    result += chunk
                })
                res.on('end', () => {
                    resolve(JSON.parse(result.toString()))
                })
            })
            request.on('error',  err => {
                reject(err)
            })
            request.end()
        })
    }
    xhr(config) {
        console.log('客户端')
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            // console.log(config)
            let { url='', data=null, method='get', headers={}} = config
            xhr.open(method, url, true)
            xhr.onload = function() {
                resolve(xhr.responseText)
            }
            xhr.send(data)
        })
    }
}

let utils = {
    extends(a, b,context) {
        for (let key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context)
                } else {
                    a[key] = b[key]
                }
            }
        }
    }
}

// Axios.prototype['get'] = function() {
//     config.method = 'get'
//     this.request(config)
// }
let methodsArr = ['get',"post","put","delete","options","head"]
methodsArr.forEach(method => {
    Axios.prototype[method] = function(config) {
        config.method = method
        return this.request(config)
    }
})

function createInstance() {
    let context = new Axios()
    let instance = context.request.bind(context)
    utils.extends(instance, Axios.prototype, context)
    utils.extends(instance, context)
    // console.dir(instance)
    return instance
}
let axios = createInstance()
if (typeof process !== 'undefined') {
    module.exports= axios
}