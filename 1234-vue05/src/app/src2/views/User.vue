<template>
    <div>
        <h3>用户中心</h3>
        <ul class="left">
            <router-link tag="li" :to="{name: 'userProfile'}">基本信息</router-link>
            <router-link tag="li" :to="{name: 'userCart'}">购物车</router-link>
        </ul>

        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .left {
        float: left;
        width: 200px;
    }
    .right {
        line-height: 30px;
        cursor: pointer;
    }
</style>