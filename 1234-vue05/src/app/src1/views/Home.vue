<template>
  <div>
    <h2>商品列表</h2>
    <select @change="changeValue" :value="sort">
        <option value="desc">从高到低</option>
        <option value="asc">从低到高</option>
    </select>
    <ul class="item-list">
        <li class="head">
            <span>名称</span>
            <span>价格</span>
            <span>操作</span>
        </li>
        <li v-for="item of items" :key="item.id">
            <span>
                <!-- <router-link :to="'/detail/' + item.id">{{item.name}}</router-link> -->
                <router-link :to="{name: 'detail', params: {id: item.id}}">{{item.name}}</router-link>
            </span>
            <span>{{item.price|RMB('$')}}</span>
            <span>
                <button>添加到购物车</button>
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import * as apis from '@/apis'
import { RMB } from '@/filter/RMB'
export default {
    data() {
        return {
            items: [],
            sort: 'desc'
        }
    },
    async created() {
        // axios({
        //     url: '/items'
        // }).then(res => {
        //     this.items = res.data
        // })
        // let rs = await apis.getItems()
        // this.items = rs.data
        // this.getItems()
    },
    filters: {
        RMB
    },
    methods: {
        changeValue({target: {value}}) {
            // this.$router.push('/?sort=' + value)
            this.$router.push({
                name: 'home',
                query: {
                    sort: value
                }
            })
            // this.getItems() 通过监听路由的变化
        },
        async getItems() {
            console.log('.....')
            // console.log(this.$route.query.sort)
            this.sort = this.$route.query.sort || 'desc'
            let rs = await apis.getItems(this.sort)
            this.items = rs.data
        }
    },
    watch: {
        $route(to, from) {
            // console.log(to, from)
            // this.getItems()
        }
    },
    beforeRouteEnter (to, from, next) {
        console.log('beforeRouoteEnter')
        // next({
        //     name: 'about'
        // })
        // this.getItems() this还获取不到
        next(vm => {
            vm.getItems()
        })
    },
    beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate')
        next()
        this.getItems()
    },
    // beforeRouteLeave (to, from, next) {
    //     console.log('beforeRouteLeave')
    // }
}
</script>

<style>
    ul {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
    }
    .item-list li {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px dotted #333;
    }
    .item-list li.head {
        font-weight: bold;
    }
    .item-list li span {
        min-height: 200px;
    }
</style>