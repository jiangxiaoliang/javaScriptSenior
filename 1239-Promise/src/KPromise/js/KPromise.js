class KPromise {
    constructor(handler) {
        this.status = 'PENDING'
        this.value
        handler(this._resolve.bind(this))
        this.resolvedQueue = []
    }
    _resolve(value) {
        // setTimeout(() => {
        //     if(this.status !== 'PENDING') return
        //     this.status = 'RESOLVED'
        //     let handler
        //     while(handler = this.resolvedQueue.shift()) {
        //         handler()
        //     }
        // }, 0)

        let observer = new MutationObserver(() => {
            if(this.status !== 'PENDING') return
            this.status = 'RESOLVED'
            let handler
            this.value = value
            while(handler = this.resolvedQueue.shift()) {
                handler(this.value)
            }
            observer.disconnect()
        })
        observer.observe(document.body, {
            attributes: true
        })
        document.body.setAttribute('_kpromise', Math.random())
    }
    then(resolvedHandler) {
        let p = new KPromise((resolve, reject) => {
            // 并不是直接调用该函数，当前一个任务完成的时候
            // then需要把当前函数临时存储起来
            // resolvedHandler()

            function newResolvedHandler(value) {
                let result = resolvedHandler(value)
                if(result instanceof KPromise) {
                    result.then(resolve)
                } else if(typeof result === 'object') {
                    let result2 = result.then()
                    resolve(result2)
                } else {
                    resolve(result)
                }
            }

            switch(this.status) {
                case 'PENDING':
                    // this.resolvedQueue.push(resolvedHandler)
                    this.resolvedQueue.push(newResolvedHandler)
                    break;
                case 'RESOLVED':
                    resolvedHandler()
                    break;
                case 'REJECTED':
                    break;
            }
        })
        return p
    }
    static resolve(val) {
        return new KPromise((resolve, reject) => {
            resolve(val)
        })
    }
    static all(iterator) {
        let len = iterator.length
        let i = 0
        let values = []
        return new KPromise(resolve => {
            iterator.forEach((it, index) => {
                it.then(val => {
                    i++
                    values[index] = val
                    if(i === len) {
                        resolve(values)
                    }
                })
            })
        })
    }
}