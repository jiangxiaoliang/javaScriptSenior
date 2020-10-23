<template>
    <div>
        <div class="comment-post">
            <div class="avatar">
                <span>{{userInfo.name[0].toUpperCase()}}</span>
            </div>
            <div class="comment-content-box editing">
                <textarea class="comment-content-input" placeholder="添加评论...." ref="comment"></textarea>
                <button class="btn btn-edit" @click="addNewComment">保存</button>
            </div>
        </div>
        <ul class="comments" v-if="comments.rows">
            <li class="comment" v-for="comment in comments.rows" :key="comment.id">
                <div class="avatar">
                    <span>{{comment.user.name[0].toUpperCase()}}</span>
                </div>
                <div class="description">
                    <div class="header">
                        <strong>{{comment.user.name}}</strong>
                        <span> at </span>
                        <i>{{comment.created|dateTime}}</i>
                    </div>
                    <div class="content">
                        {{comment.content}}
                    </div>
                </div>
            </li>
        </ul>
        <div class="comment-pagination">
            <t-pagination :pages="comments.pages" :page="comments.page" @changePage="changePage"></t-pagination>
        </div>
    </div>
</template>

<script>
import dateTime from '@/filters/dateTime'
import TPagination from '@/components/TPagination'

export default {
    name: 'TComment',
    filters: {
        dateTime
    },
    components: {
        TPagination
    },
    props: {
        cardId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            comments: {}
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.user.info
        }
    },
    async created() {
        this.$nextTick(() => {
            this.$refs.comment.focus()
        })
        await this.getComments()
    },
    methods: {
        async getComments(page = 1) {
            try {
            let rs = await this.$store.dispatch('comment/getComments', {
                boardListCardId: this.cardId,
                page
            })
            this.comments = rs.data
            } catch (error) {
                
            }
        },
        async addNewComment() {
            let { value } = this.$refs.comment
            if (value.trim() !== '') {
                try {
                    let rs = await this.$store.dispatch('comment/addComment', {
                        boardListCardId: this.cardId,
                        content: value
                    })
                    await this.getComments()
                    this.$message.success('评论成功')
                    this.$refs.comment.value = ''
                    this.$refs.comment.focus()
                } catch (error) {
                    
                }
            }
        },
        changePage(page) {
            console.log(page)
            this.getComments(page)
        }
    }
}
</script>