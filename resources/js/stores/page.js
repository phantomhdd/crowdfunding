export default {
    namespaced : true,
    state: {
        titlePage: 'Crowfunding',
    },
    mutations: {
        set: (state, payload) => {
            state.titlePage = payload.titlePage
        }
    },
    actions: {
        set: ({commit}, payload) => {
            commit('set',payload)
        }
    },
    getters: {
        titlePage : state => state.titlePage,
    }
}