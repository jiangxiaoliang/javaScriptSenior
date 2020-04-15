function ajax(options) {
    let opts = Object.assign({
        method: 'get',
        url: '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: '',
        jsonp: 'cb',
        success: function() {}
    }, options)
    // jsonp
    if (opts.type === 'jsonp') {
        jsonpFn(opts.url, opts.data, opts.jsonp, opts.success)
        return
    }
    function jsonpFn(url, data, cbName, cbFn) {
        let fnName = 'jxl_' + Math.random().toString().substr(2)
        window[fnName] = cbFn
        let path = url + '?' + o2u(data) + '&' + cbName + '=' + fnName
        // console.log(path)
        let script = document.createElement('script')
        script.src = path
        document.querySelector('head').appendChild(script) 
    }

    let xhr = new XMLHttpRequest()
    let sendData
    if (opts.method === 'get') {
        let data = o2u(opts.data)
        opts.url = opts.url + '?' + data
    }
    xhr.open(opts.method, opts.url, true)
    for (let key in opts.headers) {
        xhr.setRequestHeader(key, opts.headers[key])
    }
    switch(opts.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
            sendData = o2u(opts.data)
            break;
        case 'application/json':
            sendData = JSON.stringify(opts.data)
            break;
    }
    xhr.onload = () => {
        let res
        if (xhr.getResponseHeader('content-type').includes('xml')) {
            res = xhr.responseXML
        } else {
            res = JSON.parse(xhr.responseText)
        }
        opts.success(res)
    }
    if (opts.method === 'get') {
        xhr.send()
    } else {
        xhr.send(sendData)
    }
}
function o2u(data) {
    let keys = Object.keys(data)
    let values = Object.values(data)
    return keys.map((item, index) => {
        return `${item}=${values[index]}`
    }).join('&')
}