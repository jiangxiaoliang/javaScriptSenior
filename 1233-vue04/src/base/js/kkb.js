function kkb(_Vue) {
    _Vue.prototype.getName = function() {
        console.log('vue')
    }
    // mixin 接受一个对象，该对象会被注入到 vue 实例配置中
    Vue.mixin({
        created() {
            console.log('kkb-created')
        }
    })
}