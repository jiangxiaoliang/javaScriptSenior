<template>
    <div class="menu-list">
        <div class="info-empty" v-if="!info.length">
            <div v-if="activeName === 'works'">
                <p>私房菜不要偷偷享用哦~~制作成菜谱与大家分享吧！</p>
                <a href="">发布菜谱</a>
            </div>
        </div>
        <div class="info-empty" v-if="!info.length">
            <div v-if="activeName === 'collection'">
                <p>还没有收藏任何的菜谱，去搜自己喜欢的菜谱，收藏起来吧。</p>
                <a href="">菜谱大全</a>
            </div>
        </div>
        <menu-card :margin-left="13" :info="info"></menu-card>
    </div>
</template>

<script>
import MenuCard from '@/components/menu-card.vue'
export default {
    props: {
        info: {
            type: Array,
            default: () => []
        },
        activeName: {
            type: String,
            default: 'works'
        }
    },
    components: {
        MenuCard
    }
}
</script>