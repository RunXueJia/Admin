// import Vue from "vue";


import UploadImg from './uploadImg'
import TagsView from './TagsView'

export default {
    install(Vue) {
        Vue.component('UploadImg', UploadImg)
        Vue.component('TagsView', TagsView)
    }
}