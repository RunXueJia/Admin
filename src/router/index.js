import Vue from "vue";
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
Vue.use(VueRouter)

//constroute
export let constroute = [
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

]

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 针对 push 方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// 针对 replace 方法
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}
const createRouter = () => new VueRouter({
    routes: constroute
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}
export default router 