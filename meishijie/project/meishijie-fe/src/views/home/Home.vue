<template>
    <div class="home">
        <!-- 轮播图 -->
        <el-carousel :interval="5000" type="card" height="300px">
            <el-carousel-item v-for="item in banners" :key="item._id">
                <!--/detail?menuId=5d83bfba2f7cb93a4009cf98-->
                <router-link :to="{name: 'detail', query: {menuId: item._id}}">
                    <img 
                        :src="item.product_pic_url"
                        width="100%"
                        alt=""
                    >
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <!-- 瀑布流形式 -->
        <div>
            <h2>内容精选</h2>
            <waterfall ref="waterfall" @view="loadingMenuHandle">
                <menu-card :margin-left="13" :info="menuInfo"></menu-card>
            </waterfall>
        </div>
    </div>
</template>

<script>
import { getBanner, getMenus } from '@/service/api'
import Waterfall from '@/components/waterfall.vue'
import MenuCard from '@/components/menu-card.vue'
export default {
    name: 'home',
    components: {
        Waterfall,
        MenuCard
    },
    data() {
        return {
            banners: [],
            menuInfo: [],
            page: 1
        }
    },
    mounted() {
        getBanner().then((data) => {
            // console.log(data)
            this.banners = data.data.list
        })
        getMenus({ page: this.page }).then((data) => {
            // console.log(data)
            this.menuInfo = data.data.list
            this.pages = Math.ceil(data.data.total / data.data.page_size)
        })
    },
    methods: {
        loadingMenuHandle() {
            console.log('在外监听，已到可视区')
            this.page++
            if (this.page > this.pages) {
                this.$refs.waterfall.isLoading = false
                return
            }
            this.$refs.waterfall.isLoading = true
            getMenus({ page: this.page }).then((data) => {
                this.menuInfo.push(...data.data.list)
                this.$refs.waterfall.isLoading = false
            })
        }
    }
}
</script>
<style lang="stylus">
    .home
        h2
            text-align center
            padding 20px 0
        .el-carousel__item h3 
            color #475669
            font-size 14px
            opacity 0.75
            line-height 200px
            margin 0
        

        .el-carousel__item:nth-child(2n) 
            background-color #99a9bf
        

        .el-carousel__item:nth-child(2n+1) 
            background-color #d3dce6
</style>