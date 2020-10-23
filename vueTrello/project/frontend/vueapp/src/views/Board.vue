<template>
    <div id="board">
        <!-- 头部 -->
       <t-header></t-header>
        <!-- 正文 -->
        <main v-if="board">
           <h2>
                {{board.name}}
           </h2>
           <!-- 面板容器 -->
           <div class="board">
               <!-- 面板列表容器 -->
               <t-list v-for="list in lists"
                :key="list.id"
                :data="list"
                @dragStart="dragStart"
                @dragMove="dragMove"
                @dragEnd="dragEnd"></t-list>
               <!-- 无内容列表容器 -->
               <div class="list-wrap no-content" :class="{'list-adding': listAdding}">
                    <div class="list-add" @click="showListAdding">
                        <span class="icon icon-add"></span>
                        <span>添加另一个列表</span>
                    </div>
                    <div class="list">
                        <div class="list-cards">
                            <div class="list-card-add-form">
                                <input class="form-field-input" ref="newListName" placeholder="为这张卡片添加标题……" />
                            </div>
                        </div>
                        <div class="list-footer">
                            <div class="list-add-confirm">
                                <button class="btn btn-success" @click="addNewList">添加列表</button>
                                <span class="icon icon-close" @click="hideListAdding"></span>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
        </main>

        <!-- 弹窗，可用于对话框、弹出式菜单等 -->
        <!-- 弹出式菜单 -->
        
        <router-view></router-view>
    </div>
</template>

<script>
import THeader from '@/components/THeader'
import TList from '@/components/TList'
export default {
    name: 'Board',
    components: {
        THeader,
        TList
    },
    data() {
        return {
            listAdding: false
        }
    },
    computed: {
        board() {
            return this.$store.getters['board/getBoard'](this.$route.params.id)
        },
        lists() {
            return this.$store.getters['list/getLists'](this.$route.params.id)
        }
    },
    async created() {
        if (!this.board) {
            await this.$store.dispatch('board/getBoard', this.$route.params.id)
        }
        if (!this.lists.length) {
            await this.$store.dispatch('list/getLists', this.$route.params.id)
        }
    },
    methods: {
        showListAdding() {
            this.listAdding = true
            this.$nextTick(() => {
                this.$refs.newListName.focus()
            })
        },
        hideListAdding() {
            this.listAdding = false
        },
        addNewList() {
            const name = this.$refs.newListName.value
            if (!name.trim()) {
                this.$refs.newListName.focus()
            } else {
                try {
                    this.$store.dispatch('list/postList', {
                        boardId: this.board.id,
                        name
                    })
                     this.$message.success('列表添加成功')
                    this.$refs.newListName.value = ''
                    this.listAdding = false
                } catch (e) {}
               
            }
        },
        dragStart(e) {

        },
        dragMove(e) {
            const el = e.component.$el
            const board = el.parentNode
            const lists = [...board.querySelectorAll('.list-wrap')]
            const currentIndex = lists.findIndex(list => list === el)

            lists.forEach((list, index) => {
                if (index !== currentIndex) {
                    const clientRect = list.getBoundingClientRect()
                    if (
                        e.x >= clientRect.left &&
                        e.x <= clientRect.right &&
                        e.y >= clientRect.top &&
                        e.y <= clientRect.bottom
                    ) {
                        if (currentIndex < index) {
                            board.insertBefore(el, list.nextElementSibling)
                        } else {
                            board.insertBefore(el, list)
                        }
                    }
                }
            })
        },
        dragEnd(e) {

        }
    },
}
</script>