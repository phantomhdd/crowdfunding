import Vue from 'vue'
import Vuex from 'vuex'
import transaction from './stores/transaction.js'
import alert from './stores/alert.js'
import page from './stores/page.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        transaction,
        alert,
        page,
    }
})