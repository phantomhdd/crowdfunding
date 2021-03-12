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
            name: 'blogs',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Blogs.vue')
        },
        {
            path: '/campaigns',
            name: 'campaigns',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Campaigns.vue')
        },
        {
            path: '/campaign/:id',
            name: 'campaign',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Campaign.vue')
        },
        {
            path: '/auth/social/:provider/callback',
            name: 'social',
            component: () => import(/* webpackChunkName: "Categories" */ './views/Social.vue')
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});

export default router