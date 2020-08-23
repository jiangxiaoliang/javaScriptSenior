<template>
    <div class="step clearfix">
        {{value}}
        <div class="step-number">{{n}}.</div>
        <div class="upload-box">
            <upload-img
                action="/api/upload?type=step"
                :image-url="$options.imageUrl"
                :img-max-width="184"
                @res-url="changeUrl"
            ></upload-img>
        </div>
        <el-input
            class="introduce-text"
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="value.describe"
        ></el-input>
        <i class="delete-icon el-icon-close" @click="remove"></i>
    </div>
</template>

<script>
import UploadImg from '@/components/upload-img'
export default {
    name: 'StepUpload',
    components: { UploadImg },
    imageUrl: 'https://s1.c.meishij.net/n/images/upload_step_img.png',
    props: {
        n: {
            type: Number,
            default: 1
        },
        value: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        changeUrl(data) {
            this.$emit('input', {
                ...this.value,
                img_url: data.resImgUrl
            })
        },
        remove() {
            this.$emit('remove', this.n)
        }
    },
}
</script>

<style lang="stylus">
.step
    margin-bottom 20px
    > div
        float left
    .step-number
        height 180px
        width 100px
        font-size 60px
        color #aaa
        font-family Arial, Helvetica, sans-serif
        font-weight bold
        vertical-align top
        line-height 180px
    .introduce-text
        width 60%
        margin-left 40px
    .upload-box
        img 
            vertical-align top
</style>