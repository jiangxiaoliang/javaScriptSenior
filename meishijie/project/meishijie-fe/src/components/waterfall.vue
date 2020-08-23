<template>
    <div class="waterfall" ref="waterfall">
        <slot></slot>
        <div class="waterfall-loading" ref="loading" v-show="isLoading">
            <i class="el-icon-loading"></i>
        </div>
    </div>
</template>

<script>
import { throttle } from 'throttle-debounce'

export default {
    name: 'waterfall',
    data() {
        return {
            isLoading: false
        }
    },
    mounted() {
        // 节流函数
        this.scrollHandler = throttle(300, this.scroll.bind(this))
        window.addEventListener('scroll', this.scrollHandler)
    },
    destroyed() {
        // 解决跳转其他页面后，在回到首页this.$ref获取不到的情况
        window.removeEventListener('scroll', this.scrollHandler)
    },
    methods: {
        scroll() {
            console.log('scroll', this.isLoading)
            if (this.isLoading) return
            // 判断是否到达可视区：waterfall的下边距 < 可视区高度
            // console.log(this.$refs.waterfall)
            if (this.$refs.waterfall.getBoundingClientRect().bottom < document.documentElement.clientHeight) {
                console.log('已到达可视区')
                this.isLoading = true
                this.$emit('view')
            }
        }
    }
}
</script>

<style lang="stylus">
.waterfall-loading
    width 100%
    height 20px
    text-align center
</style>