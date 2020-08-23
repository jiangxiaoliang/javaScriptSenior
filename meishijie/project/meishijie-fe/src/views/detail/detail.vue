<template>
    <div class="menu-detail">
        <detail-header :info="menuInfo"></detail-header>
        <detail-content :info="menuInfo"></detail-content>
        <comment :info="menuInfo"></comment>
    </div>
</template>

<script>
import DetailHeader from './detail-header'
import DetailContent from './detail-content'
import Comment from './comment'
import { menuInfo } from '@/service/api'
export default {
    components: { DetailHeader, DetailContent, Comment },
    data() {
        return {
            menuInfo: {
                userInfo: {},
                raw_material: {
                    main_material: [],
                    accessories_material: []
                },
            }
        }
    },
    watch: {
        $route: {
            handler() {
                console.log(this.$route.query)
                let { menuId } = this.$route.query
                if (menuId) {
                    menuInfo({menuId}).then(({ data }) => {
                        console.log(data)
                        this.menuInfo = data.info
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '请重新进入',
                        type: 'warning'
                    })
                }
            },
            immediate: true
        }
    },
}
</script>

<style lang="stylus">

</style>