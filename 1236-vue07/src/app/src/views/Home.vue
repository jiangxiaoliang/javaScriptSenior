<template>
  <div>
    <h2>商品列表 - {{n}} - {{stateN}} - {{$store.state.n}}</h2>

    <input type="text" ref="input" /><button @click="addItem">提交</button>

    <ul class="item-list">
        <li class="head">
            <span>名称</span>
            <span>价格</span>
            <span>操作</span>
        </li>
        <li v-for="item of items" :key="item.id">
            <span>
                <!-- <router-link :to="'/detail/' + item.id">{{item.name}}</router-link> -->
                <!-- <router-link :to="{name: 'detail', params: {id: item.id}}">{{item.name}}</router-link> -->
                {{item.name}}
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
import {mapState} from 'vuex'

export default {
    data() {
        return {
            // items: [],
            // n: 0
        }
    },
    filters: {
        RMB
    },
    created() {
        // console.log(this.$store)
        // this.items = this.$store.state.items
        // this.n = this.$store.state.n

        this.$store.commit('getItems', {sort: 'desc'})
    },
    // computed: {
    //     items() {
    //         return this.$store.state.items
    //     },
    //     n() {
    //         return this.$store.state.n
    //     }
    // },
    // computed: mapState(['items', 'n']),
    // computed: mapState({
    //     items: 'items',
    //     n: 'n',
    //     stateN(state) {
    //         return state.n * 10
    //     }
    // }),
    computed: {
        val() {
            return 'vuex'
        },
        ...mapState({
            items: 'items',
            n: 'n',
            stateN(state) {
                return state.n * 10
            }
        }),
        // items() {
        //     return this.$store.getters.than(500000)
        // }
    },
    methods: {
        async addItem() {
            // 不能直接修改仓库的数据
            // this.$store.state.n = 11
            // this.$store.commit('changeN', 11)

            let val = this.$refs.input.value
            console.log(val)
            if (val != '') {
                // this.$store.state.items.unshift({
                //     id: 1004,
                //     name: val,
                //     vendor: 'apple',
                //     price: 8888
                // })
                // this.$store.commit('addItem', {
                //     name: val,
                //     vendor: 'apple',
                //     price: 8888
                // })

                // 异步提交
                let rs = await this.$store.dispatch('addItem', {
                    'name': val
                })
                console.log(rs)
            }
        }
    }
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
    .tip {
        position: fixed;
        left: 0;
        top: 0;
        border: 1px solid #000;
        background: #fff;
        padding: 10px;
    }
</style>