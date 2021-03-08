import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import i18n from './i18n.js'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import './bootstrap.js'
import '@mdi/font/css/materialdesignicons.css'
import Icon from 'vuetify/lib'

Vue.use(Icon)

export default new Icon({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
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