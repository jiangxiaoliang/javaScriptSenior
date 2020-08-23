import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        isLogin(state) {
            return !!Object.keys(state.userInfo).length
        }
    },
    mutations: {
        changeUserInfo(state, data) {
            state.userInfo = data
        }
    },
    actions: {

    }
})

export default store