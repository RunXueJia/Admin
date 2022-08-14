import Vue from "vue";
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import systemroute from './modules/system'
import userroute from './modules/user'
import contentroute from './modules/content'
import adv from './modules/adv'
Vue.use(VueRouter)


const constroute = [
    systemroute, userroute, contentroute, adv
]
const syncrouter = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: '优点达'
        },
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard'),
                meta: {
                    title: '欢迎你'
                },
            },
            /* {
                path: '/user_user',
                component: () => import('@/views/user/user'),
                meta: {
                    title: '会员列表'
                },
            },
            {
                path: '/system_menu',
                component: () => import('@/views/system/menu'),
                meta: {
                    title: '菜单管理'
                },
            },
            {
                path: '/system_role',
                component: () => import('@/views/system/role'),
                meta: {
                    title: '角色管理'
                },
            },
            {
                path: '/system_user',
                component: () => import('@/views/system/user'),
                meta: {
                    title: '用户管理'
                },
            }, */
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login//index.vue')
    },
    {
        path: '/404',
        component: () => import('@/views/notfound')
    },
    {
        path: '/*',
        redirect: '/404'
    }
]
const router = new VueRouter({
    routes: [...constroute, ...syncrouter]
})

export default router 