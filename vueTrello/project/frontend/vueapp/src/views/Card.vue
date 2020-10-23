<template>
     <!-- 遮罩层 -->
        <div class="window-overlay" style="display: block;" v-if="card && list">
            <!-- 弹出式窗口 -->
            <div class="popup">
                <div class="popup-header">
                    <div class="popup-title">
                        <div class="popup-title-icon">
                            <span class="icon icon-card"></span>
                        </div>
                        <div class="popup-title-text">
                            <textarea class="form-field-input" @blur="editCardName">{{card.name}}</textarea>
                        </div>
                        <div class="popup-title-detail">
                            在列表 {{list.name}} 中
                        </div>
                    </div>
                    <a class="popup-header-close" @click="$router.back()">
                        <i class="icon icon-close"></i>
                    </a>
                </div>
                <div class="popup-content">
                    <!-- 描述 -->
                    <div class="window-module">
                        <div class="title">
                            <div class="title-icon">
                                <span class="icon icon-description"></span>
                            </div>
                            <div class="title-text">
                                <h3>描述</h3>
                                <button class="btn btn-edit" @click="showEditDescription">编辑</button>
                            </div>
                        </div>
                        <p class="description">
                            <textarea class="form-field-input" ref="cardDescription" @blur="editCardDescription">{{card.description}}</textarea>
                        </p>
                    </div>
                    <!-- 附件 -->
                    <div class="window-module">
                        <div class="title">
                            <div class="title-icon">
                                <i class="icon icon-attachment"></i>
                            </div>
                            <div class="title-text">
                                <h3>附件</h3>
                            </div>
                        </div>
                        <ul class="attachments" v-if="Array.isArray(card.attachments)">
                            <li class="attachment" v-for="attachment in card.attachments" :key="attachment.id">
                                <div class="attachment-thumbnail" :style="`background-image: url(${server.staticPath}${attachment.path})`"></div>
                                <p class="attachment-detail">
                                    <span class="attachment-thumbnai-name"><strong>{{attachment.detail.name}}</strong></span>
                                    <span class="attachment-thumbnail-descriptions">
                                        <span class="datetime">{{attachment.createdAt|dateTime}}</span>
                                        <span> - </span>
                                        <u @click="removeAttachment(attachment.id)">删除</u>
                                    </span>
                                    <span class="attachment-thumbnail-operation">
                                        <i class="icon icon-card-cover"></i>
                                        <u v-if="attachment.isCover" @click="removeCover(attachment.id)">移除封面</u>
                                        <u v-else @click="setCover(attachment.id)">设为封面</u>
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div>
                            <button class="btn btn-edit" @click="$refs.attachment.click()">添加附件</button>
                            <input type="file" style="display:none" ref="attachment" @change="uploadAttachment"/>
                        </div>
                    </div>
                    <!-- 评论 -->
                    <div class="window-module">
                        <div class="title">
                            <div class="title-icon">
                                <i class="icon icon-activity"></i>
                            </div>
                            <div class="title-text">
                                <h3>评论</h3>
                            </div>
                        </div>
                        <t-comment :card-id="card.id"></t-comment>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import dateTime from '@/filters/dateTime'
import TComment from '@/components/TComment'

export default {
    name: 'Card',
    filters: {
        dateTime
    },
    components: {
        TComment
    },
    computed: {
        server() {
            return this.$store.state.server
        },
        list() {
            return this.$store.getters['list/getList'](this.$route.params.listId)
        },
        card() {
            return this.$store.getters['card/getCard'](this.$route.params.cardId)
        }
    },
    methods: {
        async editCardName(e) {
            const { value, innerHTML } = e.target
            if (value !== innerHTML) {
                try {
                    await this.$store.dispatch('card/editCard', {
                        id: this.card.id,
                        name: value
                    })
                    this.$message.success('修改列表名称成功')
                } catch (error) {
                }
            }
        },
        showEditDescription() {
            this.$nextTick(() => {
                this.$refs.cardDescription.focus()
            })
        },
        async editCardDescription(e) {
            const { value, innerHTML } = e.target
            if (value !== innerHTML) {
                try {
                    await this.$store.dispatch('card/editCard', {
                        id: this.card.id,
                        description: value
                    })
                    this.$message.success('修改列表描述成功')
                } catch (error) {
                    
                }
            }
        },
        async uploadAttachment() {
            const file = this.$refs.attachment.files[0]
            // console.log(file)
            try {
                await this.$store.dispatch('card/uploadAttachment', {
                    boardListCardId: this.card.id,
                    file
                })
                this.$message.success('附件上传成功')
                this.$refs.attachment.value = ''
            } catch (error) {
                
            }
        },
        async removeAttachment(id) {
            try {
                await this.$store.dispatch('card/removeAttachment', {
                    boardListCardId: this.card.id,
                    id
                })
                this.$message.success('删除附件')
            } catch (error) {}
        },
        async setCover(id) {
            try {
                await this.$store.dispatch('card/setCover', {
                    boardListCardId: this.card.id,
                    id
                })
                this.$message.success('设置封面')
            } catch (error) {
                
            }
        },
        async removeCover(id) {
            try {
                await this.$store.dispatch('card/removeCover', {
                    boardListCardId: this.card.id,
                    id
                })
            } catch (error) {
                
            }
        }
    }
}
</script>