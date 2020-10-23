import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import board from './board/index'
import list from './list/index'
import card from './card/index'
import comment from './comment/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: {
      staticPath: process.env.VUE_APP_SERVER_STATIC_PATH
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    board,
    list,
    card,
    comment
  }
})
