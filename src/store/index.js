import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)
import user from './modules/user';
import setting from './modules/setting';
import permission from './modules/permission';
const store = new Vuex.Store({
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        user: user,
        setting: setting,
        permission,
    }
})


export default store