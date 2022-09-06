import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import uView from 'uview-ui';

//时间处理函数
import moment from '@/static/js/moment.min.js'
Vue.prototype.$moment = moment
 
//vuex
import store from '@/store/store.js'
Vue.prototype.$store = store 

//请求
import Api from 'app/api.js'// 引入app.js
Vue.prototype.$Api = Api//     Api接口挂载全局

//全局table组件
import gdxTable from './components/gdx-table/gdx-table.vue'
Vue.component('gdx-table',gdxTable)

//小程序分享
import share from './utils/share.js'
Vue.mixin(share)

Vue.use(uView);
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif