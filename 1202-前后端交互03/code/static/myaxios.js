class Axios {
    constructor() {
        this.test = 'a'
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        }
    }
    request(config) {
        // 组装队列
        let chain = [this.xhr, undefined]
        this.interceptors.request.handles.forEach(interceptor => {
            chain.unshift(interceptor.fulfilled, interceptor.rejected)
        })
        this.interceptors.response.handles.forEach(interceptor => {
            chain.push(interceptor.fulfilled, interceptor.rejected)
        })
        let promise = Promise.resolve(config)
        while(chain.length > 0) {
            promise.then(chain.shift(), chain.shift())
        }
        return promise

        // [ful1,rej1,ful2,rej2,this.xhr,undefined,ful1,rej1,ful2,rej2]
        // return this.xhr(config)
    }
    xhr(config) {
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
    console.dir(instance)
    return instance
}
let axios = createInstance()