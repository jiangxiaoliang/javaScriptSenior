<template>
  <div>
    <h2>商品列表</h2>
    <select @change="changeValue" :value="sort">
        <option value="desc">从高到低</option>
        <option value="asc">从低到高</option>
    </select>

    <Page :page="page" :pages="pages"></Page>

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
                <button @click="showTip(item.id, $event)">点击查看详情</button>
            </span>
            <span>{{item.price|RMB('$')}}</span>
            <span>
                <button>添加到购物车</button>
            </span>
        </li>
    </ul>

    <div class="tip" :style="{left: tip.left, top:tip.top}" v-show="tip.isShow">
        <Detail v-if="tip.isShow" :id="tip.id"></Detail>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import * as apis from '@/apis'
import { RMB } from '@/filter/RMB'
import Page from '@/components/Page'
import  Detail from '@/views/Detail'

export default {
    data() {
        return {
            items: [],
            sort: 'desc',
            page: 1,
            pages: 10,
            tip: {
                id: 0,
                left: 0,
                top: 0,
                isShow: false
            }
        }
    },
    filters: {
        RMB
    },
    components: {
        Page,
        Detail
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
        },
        async getItems() {
            this.sort = this.$route.query.sort || 'desc'
            let rs = await apis.getItems(this.sort)
            this.items = rs.data
        },
        showTip(id, e) {
            let {left: L, top: T} = e.target.getBoundingClientRect()
            this.tip = {
                id,
                left: L + 'px',
                top: T + e.target.offsetHeight + 'px',
                isShow: true
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getItems()
        })
    },
    beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate')
        next()
        this.getItems()
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