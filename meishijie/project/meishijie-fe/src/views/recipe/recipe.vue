<template>
    <div class="recipe">
        <!-- 菜谱分类 按照 -->
        <el-tabs v-model="activeName" type="border-card" @tab-click="tabClickHandle">
            <el-tab-pane
                v-for="item in classifies"
                :label="item.parent_name"
                :name="item.parent_type"
                :key="item.parent_type"
            >
                <div class="recipe-link">
                    <router-link 
                        v-for="option in item.list"
                        :key="option.type"
                        :to="{query: {...$route.query, classify: option.type, page: 1}}"
                        :class="{active: classifyType === option.type}"
                    >
                        {{option.name}}
                    </router-link>
                </div>
            </el-tab-pane>
        </el-tabs>
        <h2>家常好味道，给你家一般的温暖</h2>
        <el-container>
            <el-aside width="220px" class="recipe-aside">
                <div class="filter-box">
                    <h4>筛选</h4>
                    <el-collapse v-model="propertiesActiveName">
                        <el-collapse-item
                            v-for="item in properties"
                            :title="item.parent_name"
                            :name="item.parent_type"
                            :key="item.parent_type"
                        >
                            <div class="filter-tags">
                                <el-tag
                                    v-for="option in item.list"
                                    :key="option.type"
                                    :class="{'tag-selected': propertiesTypes[item.title] === option.type}"
                                    type="info"
                                    @click="selectedTag(option)"
                                >
                                    {{option.name}}
                                </el-tag>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-aside>
            <el-main class="filter-menus-box">
                <div class="menu-query" v-show="!list.length && !loading">暂时没有过滤出菜谱信息，请选择其他的筛选条件</div>
                <menu-card style="min-height: 75%" :info="list"></menu-card>
                <div style="text-align: center" v-show="!loading">
                    <el-pagination
                        :hide-on-single-page="pages.totalPages === 1 || !list.length"
                        style="display: inline-block"
                        layout="prev, pager, next"
                        :current-page.sync="pages.currentPage"
                        :page-size="pages.pageSize"
                        :total="pages.total"
                        @size-change="changePage"
                        @current-change="changePage">
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import MenuCard from '@/components/menu-card'
import { getClassify, getProperty, getMenus } from '@/service/api'
export default {
    components: { MenuCard },
    data() {
        return {
            activeName: '1',
            propertiesActiveName: [], // 记录多个菜谱分类
            classifyType: '', // 记录菜谱分类类型
            classifies: [], // 菜谱分类
            properties: [], // 菜谱熟悉
            propertiesTypes: {}, // 记录菜谱熟悉类型，有多个  {a:'1-2',b:'2-1'}
            list: [],
            pages: {
                pageSize: 0,
                total: 0,
                currentPage: 0,
                totalPages: 0
            },
            loading: false
        }
    },
    watch: {
        $route: {
            handler() {
                const { classify } = this.$route.query
                if (classify) {
                    this.activeName = classify.split('-')[0]
                    this.classifyType = classify
                    this.getMenus() // 执行这里的时候，mounted不一定执行，元素就不存在
                }
            },
            immediate: true
        }
    },
    mounted() {
        getClassify().then(data => {
            console.log(`classify:${JSON.stringify(data)}`)
            this.classifies = data.data
            // 拿到数据，默认查询第一个分类数据
            if (!this.$route.query.classify) {
                this.activeName = this.classifies[0].parent_type
                this.classifyType = this.classifies[0].list[0].type
                this.$router.push({
                    query: {
                        classify: this.classifyType,
                        page: 1
                    }
                })
            }
        })
        getProperty().then(data => {
            console.log(`property: ${JSON.stringify(data)}`)
            this.properties = data.data
            const { query } = this.$route // {craft:'1-1',flavor: '2-1',hard: '3-2' }
            this.propertiesTypes = this.properties.reduce((o, item) => {
                o[item.title] = query[item.title] ? query[item.title] : ''
                if (o[item.title]) {
                    this.propertiesActiveName.push(o[item.title][0])
                }
                return o
            }, {})
            console.log(this.propertiesTypes)
        })
    },
    methods: {
        tabClickHandle() {
            const activeName = this.activeName
            // console.log(activeName)
            const item = this.classifies.find(item => item.parent_type === activeName)
            if (item) {
                this.classifyType = item.list[0].type
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        classify: item.list[0].type,
                        page: 1
                    }
                })
            }
        },
        selectedTag(option) {
            let query = { ...this.$route.query }
            if (this.propertiesTypes[option.title] === option.type) {
                this.propertiesTypes[option.title] = ''
                delete query[option.title]
            } else {
                this.propertiesTypes[option.title] = option.type
                query[option.title] = option.type
            }
            this.$router.push({
                query
            })
        },
        getMenus() {
            const query = { ...this.$route.query }
            const params = {
                page: query.page || 1,
                classify: query.classify
            }
            delete query.page
            delete query.classify
            if (Object.keys(query).length) {
                params.property = {
                    ...query
                }
            }
            console.log(`params: ${JSON.stringify(params)}`)
            let loading = null
            this.$nextTick(() => {
                loading = this.$loading({
                    target: '.filter-menus-box',
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            })
            this.list = []
            this.loading = true
            getMenus(params).then(data => {
                console.log(`menus:${JSON.stringify(data)}`)
                this.list = data.data.list
                this.pages.pageSize = data.data.page_size
                this.pages.total = data.data.total
                this.pages.currentPage = data.data.current_page
                if (loading) loading.close()
                this.loading = false
                this.pages.totalPages = Math.ceil(this.pages.total / this.pages.pageSize)
            })
        },
        changePage() {
            console.log('changePage')
            this.$router.push({
                query: {
                    ...this.$route.query,
                    page: this.pages.currentPage
                }
            })
        }
    }
}
</script>

<style lang="stylus">
.recipe
    h2
        text-align center
        line-height 150px
    .el-main
        padding 0
    .filter-box
        background #fff
        padding 10px
        width 100%
        float left
        box-sizing border-box
    .filter-tags
        display flex
        flex-wrap wrap
        justify-content space-around
        .tag-selected
            background #ff3232
            color #fff
    .menu-empty
        width 100%
        text-align center
        font-size 20px
.recipe-link
    font-size 0;
    margin-top 5px
    a
      display inline-block
      font-size 12px
      padding 0px 8px
      height 28px
      line-height 28px
    .active 
      background #ff3232
      color #fff
</style>