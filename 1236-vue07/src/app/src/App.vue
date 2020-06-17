<template>
  <div id="app">
    <h1>vue路由</h1>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <span> | </span>
      <router-link to="/about">About</router-link>
       <span> | </span>
      <router-link to="/user">User</router-link>
    </div>

    <!-- <div class="nav">
      <router-link to="/" tag="button">Home</router-link>
      <span> | </span>
      <router-link to="/about" tag="button">About</router-link>
    </div> -->

    <hr>
    <!-- 当满足当前 url 的路由组件将会被显示在 router-view中 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  .router-link-exact-active {
    color: red
  }
  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-leave-active {
    transition: none
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>