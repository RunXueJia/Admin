import { constRoutes } from '@/router/index'
import { tranListToTreeData } from '@/utils/myFountion'
export default {
    namespaced: true,//开启模块化
    state: {
        routes: constRoutes,
    },
    getters: {},
    mutations: {
        setRoutes(state, newRoutes) {
            state.routes = [...constRoutes, ...newRoutes]
        },

    },
    actions: {
        filterRoutes(context, data) {
            console.log(data);
            let arr = []
            data.forEach(item => {
                let obj = {
                    path: item.path,
                    name: item.mark,
                    redirect: item.redirect,
                    meta: {
                        pid: item.pid,
                        title: item.title,
                    },
                    component: require(`@/views/${item.component}`).default
                }


                arr.push(obj)
            })

            const routes = tranListToTreeData(arr, 0)
            context.commit('setRoutes', routes)
            return routes
        },


    },
}