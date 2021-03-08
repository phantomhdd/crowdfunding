import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import './bootstrap.js'
import VueI18n from 'vue-i18n'
import '@mdi/font/css/materialdesignicons.css'
import Icon from 'vuetify/lib'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(Icon)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

export default new Icon({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})

const numberFormats = {
    'id-ID': {
        currency: {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'symbol'
        }
    },
    'ja-JP': {
        currency: {
            style: 'currency',
            currency: 'JPY',
            currencyDisplay: 'symbol'
        }
    }
}  

const i18n = new VueI18n({
    numberFormats
})

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    i18n,
    components: {
        App
    },
});