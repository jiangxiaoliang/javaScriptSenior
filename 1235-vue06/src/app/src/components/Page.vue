<template>
   <div class="page">
        <span v-for="i in pages" :class="{current: i === page}" :key="i" @click="changePage(i)">
            {{i}}
        </span>
   </div>
</template>

<script>
    export default {
        props: {
            page: {
                type: Number,
                default: 1
            },
            pages: {
                type: Number,
                required: true
            }
        },
        methods: {
            changePage(i) {
                this.$router.push({
                    name: 'home',
                    query: {
                        page: i
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .page {
        margin: 20px 0;
    }
    span {
        border: 1px solid #000000;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
    span.current {
        background: rgba(0, 255,255, .3);
        cursor: default;
    }
</style>