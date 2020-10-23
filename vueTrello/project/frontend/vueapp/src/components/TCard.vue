<template>
    <router-link :to="{name: 'Card', params:{listId: card.boardListId, cardId: card.id}}" class="list-card" v-if="card">
        <div v-if="card.coverPath" class="list-card-cover"
            :style="'background-image: url('+ card.coverPath +');'">
        </div>
        <div class="list-card-title">{{card.name}}</div>
        <div class="list-card-badges">
            <div class="badge" v-if="card.description">
                <span class="icon icon-description"></span>
            </div>
            <div class="badge" v-if="card.commentCount > 0">
                <span class="icon icon-comment"></span>
                <span class="text">{{card.commentCount}}</span>
            </div>
            <div class="badge" v-if="card.attachments && card.attachments.length > 0">
                <span class="icon icon-attachment"></span>
                <span class="text">{{card.attachments.length}}</span>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'TCard',
    props: {
        card: {
            type: Object
        }
    }
}
</script>