import * as api from '@/api'

export default {
    namespaced: true,
    state: {
        lists: []
    },
    getters: {
        getLists: ({ lists }) => boardId => lists.filter(list => list.boardId == boardId),
        getList: ({ lists }) => listId => lists.find(list => list.id == listId)
    },
    mutations: {
        updateLists: (state, data) => {
            state.lists = [...state.lists, ...data]
        },
        addList: (state, data) => {
            state.lists = [...state.lists, data]
        },
        updateList: (state, data) => {
            state.lists = state.lists.map(list => {
                if (list.id === data.id) {
                    return {...list, ...data}
                }
                return list
            })
        }
    },
    actions: {
        getLists: async({ commit }, boardId) => {
            try {
                const rs = await api.getLists(boardId)
                commit('updateLists', rs.data)
                return rs
            } catch (e) {
                throw e
            }
        },
        postList: async({ commit }, data) => {
            try {
                const rs = await api.postList(data)
                commit('addList', rs.data)
                return rs
            } catch (error) {
                throw error
            }
        },
        editList: async({ commit }, data) => {
            try {
                const rs = await api.putList(data)
                commit('updateList', data)
                return rs
            } catch (error) {
                throw error
            }
        }
    }
}