import * as api from '@/api'

export default {
    namespaced: true,
    state: {
        boards: null,
        inited: false
    },
    mutations: {
        updateBoards: (state, data) => {
            state.boards = data
            state.inited = true
        },
        addBoard: (state, data) => {
            if (state.boards === null) {
                state.boards = []
            }
            state.boards = [...state.boards, data]
        }
    },
    getters: {
        getBoard: ({ boards }) => id => Array.isArray(boards) ? boards.find(board => board.id == id) : null
    },
    actions: {
        getBoards: async({ commit }) => {
            try {
                const rs = await api.getBoards()
                commit('updateBoards', rs.data)
                return rs
            } catch (error) {
                throw error
            }
        },
        getBoard: async ({ commit }, id) => {
            try {
                const rs = await api.getBoard(id)
                commit('addBoard', rs.data)
                return rs
            } catch (error) {
                throw error
            }
        },
        postBoard: async({ commit }, data) => {
            try {
                const rs = await api.postBoard(data)
                commit('addBoard', rs.data)
            } catch (e) {
                throw e
            }
        }
    }
}