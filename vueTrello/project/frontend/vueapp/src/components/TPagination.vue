<template>
    <div class="pagination">
        <span v-if="firstShowPage > 1" @click="goToPage(1)">首页</span>
        <span @click="goToPage(page-1)">上一页</span>
        <span @click="goToPage(nowPage-showPageNumber)">...</span>
        <span v-for="showPage in showPages" :key="showPage" :class="{'current-page': showPage === page}" @click="goToPage(showPage)">{{showPage}}</span>
        <span @click="goToPage(nowPage+showPageNumber)">...</span>
        <span @click="goToPage(page+1)">下一页</span>
        <span v-if="lastShowPage != pages" @click="goToPage(pages)">尾页</span>
    </div>
</template>

<script>
export default {
    name: 'TPagination',
    props: {
        page: {
            type: Number,
            default: 1
        },
        pages: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            showPageNumber: 5,
            nowPage: this.page
        }
    },
    computed: {
        showPages() {
            let s = this.page
            let e = this.page
            let arr = [this.page]
            let p = this.showPageNumber - 1
            while(p > 0) {
                if (p > 0 && s > 1) {
                    arr.unshift(--s)
                    p--
                }
                if (p > 0 && e < this.pages) {
                    arr.push(++e)
                    p--
                }
                if (s <= 1 && e >= this.pages) break
            }
            return arr
        },
        firstShowPage() {
            return this.showPages[0]
        },
        lastShowPage() {
            return this.showPages[this.showPages.length - 1]
        }
    },
    methods: {
        goToPage(n) {
            n = Math.max(1, n)
            n = Math.min(this.pages, n)
            if (this.page !== n) {
                this.nowPage = n
                this.$emit('changePage', n)
            }
        }   
    }
}
</script>