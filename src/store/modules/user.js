import { GetUserInfoApi, LoginApi } from "@/api/USER";
import { setToken, getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from "../index";
export default {
    namespaced: true,
    state: {
        token: getToken(),

        UserInfo: {}

    },
    mutations: {
        //设置token
        setToken(state, data) {
            state.token = data
            setToken(data)
        },
        //设置用户信息
        setUserInfo(state, data) {
            state.UserInfo = data
        }
    },
    getters: {
        //用户id 快捷读取
        UserId(state) {
            return state.UserInfo.id
        },
        //用户名 快捷读取
        name: (state) => state.UserInfo.name,
        token: (state) => state.token,
    },
    actions: {
        //获取用户信息
        async GetUserInfoFn({ commit }) {
            let { userInfo, menuList } = await GetUserInfoApi()
            commit('setUserInfo', userInfo)
            resetRouter()
            store.dispatch('permission/filterRoutes', menuList)
            return menuList
        },
        //用户登陆
        async loginFn({ commit }, data) {
            // console.log(data);
            let res = await LoginApi(data);
            commit('setToken', res.token);
            // console.log(res);
        },

        //退出登陆
        quitOut({ commit }) {
            removeToken()
            commit('setUserInfo', {})
            resetRouter()
        }
    }
}