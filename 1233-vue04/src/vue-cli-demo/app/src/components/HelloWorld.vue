<template>
  <div class="hello">
    <p>hello - {{msg}}</p>
    <img src="https://img.kaikeba.com/web/kkb_index/img_index_logo.png" alt="">
    <img src="@/assets/logo.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
