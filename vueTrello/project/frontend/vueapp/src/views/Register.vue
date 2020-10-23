<template>
    <div id="register-login">
        <a class="logo" href="/"></a>

        <div class="section-wrapper">
            <div class="account-form">
                <h1>注册 Trello</h1>
                <form id="login-form" method="POST" @submit.prevent="sbumitRegister">
                    <div>
                        <label>
                            <input v-model="user.name" class="form-field" autofocus="autofocus" placeholder="输入用户名" />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input v-model="user.password" type="password" class="form-field" placeholder="输入密码" />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input v-model="user.rePassword" type="password" class="form-field" placeholder="确认密码" />
                        </label>
                    </div>
                    <div>
                        <input type="submit" class="btn btn-success" value="注册" />
                        <span class="signin-singnup-separator">或者</span>
                        <!-- <input type="button" class="btn" value="登陆" /> -->
                        <router-link :to="{name: 'Login'}" tag="button" class="btn">登陆</router-link>
                    </div>
                </form>
            </div>
        </div>
        <!-- <t-message></t-message> -->
    </div>
</template>


<script>
// import TMessage from '@/components/TMessage'
// import TMessage from '@/components/TMessage/TMessage.js'
export default {
    name: 'Register',
    // components: {
    //     TMessage
    // },
    data() {
        return {
            user: {
                name: '',
                password: '',
                rePassword: ''
            }
        }
    },
    methods: {
        async sbumitRegister() {
            // 数据验证
            if (this.user.name.trim() === '' || this.user.password.trim() === '') {
                // return alert('用户名或者密码为空')
                // return TMessage.error('用户名或者密码为空')
                return this.$message.error('用户名或者密码为空')
            }
            if (this.user.password.trim() !== this.user.rePassword.trim()) {
                // return alert('两次输入密码不一致')
                return this.$message.error('两次输入密码不一致')
            }
            try {
                await this.$store.dispatch('user/register', {
                    ...this.user
                })
                this.$router.push({name: 'Login'})
            } catch(e) {
                console.log(e)
            }
        }
    },

}
</script>