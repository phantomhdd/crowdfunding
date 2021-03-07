import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            alias: '/home',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Home.vue')
        },
        {
            path: '/donations',
            name: 'donations',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Donations.vue')
        },
        {
            path: '/blogs',
            name: 'blog',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Blogs.vue')
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});

export default router