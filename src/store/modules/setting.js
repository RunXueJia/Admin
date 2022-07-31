import { setToken, getToken, removeToken } from '@/utils/auth'

import { GetUserInfoApi, LoginApi } from "@/api/USER";

export default {
    namespaced: true,
    state: {
        isCollapse: false, //是否折叠
    },
    mutations: {

        //首页折叠
        toggleCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
    },
    getters: {},
    actions: {

    }
}