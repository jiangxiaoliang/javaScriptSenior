<template>
   <transition name="message-fade">
        <div :class="[
            'message',
            'message-' + type,
            center ? 'is-center' : ''
        ]"
            :style="{top: offset + 'px'}"
            v-if="!closed"
        >
            <p class="message-content">{{message}}</p>
            <i class="icon icon-close"></i>
        </div>
   </transition>
</template>

<script>
export default {
    name: 'TMessage',
    data() {
        return {
            message: '这是默认信息',
            type: 'info',
            center: true,
            offset: 20,
            closed: false,
            duration: 2000,
            timer: null,
            onClose: null
        }
    },
    mounted() {
        this.timer = setTimeout(() => {
            if (!this.closed) {
                this.close()
            }
        }, this.duration)
    },
    methods: {
        close() {
            this.closed = true
            if (typeof this.onClose === 'function') {
                this.onClose()
            }
        }
    }
}
</script>