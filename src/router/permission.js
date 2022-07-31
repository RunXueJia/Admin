import { getToken } from '@/utils/auth'
import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
    if (getToken()) {
        // console.log(getToken());
        if (to.path === '/login') return next('/')
        if (!store.getters['user/UserId']) await store.dispatch('user/GetUserInfoFn')
        return next()
    }
    if (!whiteList.includes(to.path)) return next('/login')
    next()
    // if (getToken() && to.path === '/login') return next('/')
    // if (!getToken()&&!whiteList.includes(to.path)) return next('/login')
    // next()



})