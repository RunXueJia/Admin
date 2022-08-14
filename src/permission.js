import { getToken } from '@/utils/auth'
import router from '@/router/index'
import { constRoutes } from '@/router/index'
import store from '@/store'

// 导航守卫的逻辑
const whitelist = ['/404', '/login']

router.beforeEach(async (to, from, next) => {
    if (getToken()) {
        // 登录了
        if (to.path === '/login') {
            // 登录去登录页面
            next('/')
        } else {
            // 登录了去别的页面
            // 判断是否有用户资料，没有则请求
            if (!store.getters['user/userId']) {
                const res = await store.dispatch('user/getUserProfileAction')
                // console.log(res);

                const routes = await store.dispatch('permission/filterRoutes', res)
                // console.log([...constRoutes, ...routes]);
                router.addRoutes([...constRoutes, ...routes])
                // console.log(router);


            }
            next()
        }
    } else {
        // 未登录

        if (whitelist.includes(to.path)) {
            // 放行
            next()
        } else {
            next('/login')
        }
    }

})