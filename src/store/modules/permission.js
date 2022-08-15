import router from '@/router'
import { tranListToTreeData } from '@/utils/myFountion'
import { constroute } from '@/router'
export default {
    namespaced: true,//开启模块化
    state: {
        routes: [],
    },
    getters: {},
    mutations: {
        setRoutes(state, newRoutes) {
            state.routes = [...newRoutes]
        }
    },
    actions: {
        filterRoutes(context, data) {
            // console.log(data);
            let arr = []
            data.forEach(item => {
                let obj = {
                    path: item.path,
                    meta: {
                        pid: item.pid,
                        title: item.title,
                        id: item.id,
                    },
                    component: require(`@/views/${item.component}`).default
                }
                if (item.redirect) obj.redirect = item.redirect

                arr.push(obj)
            })
            const routes = tranListToTreeData(arr, 0)
            context.commit('setRoutes', routes)
            router.addRoutes([...routes, { path: '/*', redirect: '/404' }])
        },


    },
}