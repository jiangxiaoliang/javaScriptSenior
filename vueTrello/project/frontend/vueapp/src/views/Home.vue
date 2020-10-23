<template>
    <div id="home">
        <!-- 头部 -->
       <t-header></t-header>

        <main>
            <h2>
                <span class="icon icon-board"></span>
                我的看板
            </h2>
            <ul class="board-items">
                <router-link :to="{name: 'Board', params: { 'id': board.id }}"
                    v-for="board in boards" 
                    :key="board.id"
                    class="board-item"
                    tag="li">
                    <span class="title">{{board.name}}</span>
                </router-link>
                <li class="board-item create-new-board">
                    <textarea class="title form-field-input" placeholder="创建新看板" ref="newBoardName" @blur="postBoard"></textarea>
                </li>
            </ul>
        </main>
    </div>
</template>

<script>
import THeader from '@/components/THeader'
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        THeader
    },
    created() {
        if (!this.inited) {
            this.$store.dispatch('board/getBoards')
        }
    },
    computed: {
        ...mapState('board', {
            boards: state => state.boards,
            inited: state => state.inited
        }),
    },
    methods: {
        postBoard() {
            const boardContent = this.$refs.newBoardName.value
            if (boardContent.trim()) {
                try {
                    this.$store.dispatch('board/postBoard', {
                        name: boardContent
                    })
                    this.$refs.newBoardName.value = ''
                    this.$message.success('添加面板成功')
                } catch (e) {}
            }
        }
    },
}
</script>