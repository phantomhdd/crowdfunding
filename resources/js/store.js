import Vue from 'vue'
import Vuex from 'vuex'
import transaction from './stores/transaction.js'
import alert from './stores/alert.js'
import page from './stores/page.js'
import auth from './stores/auth.js'
import dialog from './stores/dialog.js'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'crowdfunding',
    storage: localStorage
})

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: {
        transaction,
        alert,
        page,
        auth,
        dialog,
    }
})