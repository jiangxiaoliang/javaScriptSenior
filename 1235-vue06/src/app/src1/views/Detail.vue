<template>
    <div>
        <h1>商品详情页</h1>
        <template v-if="item">
            <h2>商品详情 - {{item.name}}</h2>
            <dt>ID</dt>
            <dd>{{item.id}}</dd>
            <dt>名称</dt>
            <dd>{{item.name}}</dd>
            <dt>价格</dt>
            <dd>{{item.price|RMB}}</dd>
        </template>
        <template v-else>
            <h2>没有商品信息</h2>
        </template>
    </div>
</template>

<script>
import * as apis from '@/apis'
import { RMB } from '@/filter/RMB'

export default {
    data() {
        return {
            item: null
        }
    },
    props: ['id', 'a'],
    async created() {
        console.log(this)
        // console.log(this.id, this.$route.params.id)
        // let id = this.$route.params.id || this.id
        // console.log(this.$route)
        let id = this.id
        let rs = await apis.getItem(id)
        this.item = rs.data
    },
    filters: {
        RMB
    }
}
</script>

<style>

</style>