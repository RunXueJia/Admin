import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)
import user from './modules/user';
import setting from './modules/setting';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
const store = new Vuex.Store({
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        user: user,
        setting: setting,
        permission,
        tagsView
    }
})


export default store