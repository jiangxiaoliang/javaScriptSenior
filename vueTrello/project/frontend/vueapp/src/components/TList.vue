<template>
    <div class="list-wrap" :class="{'list-adding': listAdding}">
        <div class="list-placeholder" ref="listPlaceHolder"></div>
        <div class="list" ref="list">
            <div class="list-header" ref="listHeader">
                <textarea class="form-field-input" ref="newBoardListName" @mousedown.prevent @blur="editBoardName">{{data.name}}</textarea>
                <div class="extras-menu" @mousedown.prevent>
                    <span class="icon icon-more"></span>
                </div>
            </div>
            <div class="list-cards">
                <!-- <div class="list-card">
                    <div class="list-card-cover"
                        style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);">
                    </div>
                    <div class="list-card-title">接口代码编写及测试</div>
                    <div class="list-card-badges">
                        <div class="badge">
                            <span class="icon icon-description"></span>
                        </div>
                        <div class="badge">
                            <span class="icon icon-comment"></span>
                            <span class="text">2</span>
                        </div>
                        <div class="badge">
                            <span class="icon icon-attachment"></span>
                            <span class="text">5</span>
                        </div>
                    </div>
                </div> -->
                <t-card v-for="card in cards" :card="card" :key="card.id"></t-card>
                <div class="list-card-add-form">
                    <textarea class="form-field-input" placeholder="为这张卡片添加标题……" ref="newListName"></textarea>
                </div>
            </div>
            <div class="list-footer">
                <div class="list-card-add" @click="showListCardAddForm">
                    <span class="icon icon-add"></span>
                    <span>添加另一张卡片</span>
                </div>
                <div class="list-add-confirm">
                    <button class="btn btn-success" @click="addNewCard">添加卡片</button>
                    <span class="icon icon-close" @click="hideListCardAddForm"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TCard from '@/components/TCard'

export default {
    name: 'TList',
    components: {
        TCard
    },
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {
            drag: {
                isDown: false,
                isDrag: false,
                downClientX: 0,
                downClientY: 0,
                downElementX: 0,
                downElementY: 0
            },
            listAdding: false
        }
    },
    async created() {
        if (!this.cards.length) {
            this.$store.dispatch('card/getCards',  this.data.id)
        }
    },
    mounted() {
        this.$refs.list.addEventListener('mousedown', this.dragDown)
        document.addEventListener('mousemove', this.dragMove)
        document.addEventListener('mouseup', this.dragUp)
    },
    computed: {
        cards() {
            return this.$store.getters['card/getCards'](this.data.id)
        }
    },
    methods: {
        dragDown(e) {
            this.drag.isDown = true
            this.drag.downClientX = e.clientX
            this.drag.downClientY = e.clientY
            const pos = this.$refs.list.getBoundingClientRect()
            this.drag.downElementX = pos.x
            this.drag.downElementY = pos.y
        },
        dragMove(e) {
            if (this.drag.isDown) {
                const listElement = this.$refs.list
                const disX = e.clientX - this.drag.downClientX
                const disY = e.clientY - this.drag.downClientY
                if (disX > 10 || disY > 10) {
                    if (!this.drag.isDrag) {
                        // console.log('start')
                        this.drag.isDrag = true
                        this.$refs.listPlaceHolder.style.height = listElement.offsetHeight + 'px'
                        listElement.style.position = 'absolute'
                        listElement.style.zIndex = 99999
                        listElement.style.transform = 'rotate(5deg)'
                        document.body.appendChild(listElement)
                        this.$emit('dragStart', {
                            component: this
                        })
                    }
                    listElement.style.left = disX + this.drag.downElementX + 'px'
                    listElement.style.top = disY + this.drag.downElementY + 'px'
                    // console.log('move')
                    this.$emit('dragMove', {
                        component: this,
                        x: e.clientX,
                        y: e.clientY
                    })
                }
            }
        },
        dragUp(e) {
            // document.removeEventListener('mousemove', this.dragMove)
            // console.log('dragup')
            // console.log(this.drag.isDown, this.drag.isDrag)
            if (this.drag.isDown) {
                if (this.drag.isDrag) {
                   const listElement = this.$refs.list
                   this.$refs.listPlaceHolder.style.height = 0
                   listElement.style.position = 'relative'
                   listElement.style.zIndex = 0
                   listElement.style.transform = 'rotate(0deg)'
                   listElement.style.left = 0
                   listElement.style.top = 0
                   this.$el.appendChild(listElement)
                   this.$emit('dragEnd', {
                       component: this
                   })
                } else {
                    if (e.path.includes(this.$refs.newBoardListName)) {
                        this.$refs.newBoardListName.select()
                    }
                }
                this.drag.isDown = this.drag.isDrag = false
            }        
        },
        async editBoardName() {
            const { value, innerHTML } = this.$refs.newBoardListName
            // console.log(value, innerHTML)
            if (value !== innerHTML) {
                await this.$store.dispatch('list/editList', {
                    id: this.data.id,
                    boardId: this.data.boardId,
                    name: value
                })
            }
        },
        showListCardAddForm() {
            this.listAdding = true
            this.$nextTick(() => {
                this.$refs.newListName.focus()
            })
        },
        async addNewCard() {
            const { value } = this.$refs.newListName
            if (value.trim() !== '') {
                try {
                    await this.$store.dispatch('card/postCard', {
                        boardListId: this.data.id,
                        name: value
                    })
                    this.$message.success('添加卡片成功')
                    this.$refs.newListName.value = ''
                    this.listAdding = false
                } catch (e) {}
            } else {
                this.$refs.newListName.focus()
            }

        },
        hideListCardAddForm() {
            this.listAdding = false
            this.$refs.newListName.value = ''
        }
    },
}
</script>