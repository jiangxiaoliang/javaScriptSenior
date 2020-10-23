import { register, login } from "../../api"

export default {
    namespaced: true,
    state: {
        info: null
    },
    mutations: {
        initUserInfo: (state) => {
            try {
                let data = JSON.parse(localStorage.getItem('user'))
                state.info = data
            } catch(e) {
                console.log(e)
            }
        },
        updateUserInfo: (state, data) => {
            state.info = data
            window.localStorage.setItem('user', JSON.stringify(data))
        },
        removeUserInfo: (state) => {
            state.info = null
            window.localStorage.removeItem('user')
        }
    },
    actions: {
        register: ({}, data) => {
            return register(data)
        },
        login: async ({commit}, data) => {
            try {
                let rs = await login(data)
                commit('updateUserInfo', {
                    id: rs.data.id,
                    name: rs.data.name,
                    authorization: rs.headers.authorization
                })
            } catch(e) {
                throw e
            }
        },
        logout: ({commit}) => {
            commit('removeUserInfo')
        }
    }
}