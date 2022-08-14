import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/index'
import '@/router/permission'
import '@/assets/font-awesome-4.7.0/css/font-awesome.css'
// console.log(process.env.VUE_APP_ApiUrl);
import components from '@/components'
Vue.use(components)
Vue.config.productionTip = false
Vue.use(ElementUI);
import router from '@/router';
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


