//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({//全局变量定义
    state: {
       tabbarIndex:uni.getStorageSync('tabbarIndex')?uni.getStorageSync('tabbarIndex'):0, //底部导航栏索引
	   tabItem:[{
			"pagePath": "pages/index/index",
			"text": "组件"
		}, {
			"pagePath": "pages/report/dailyReport/getStatList",
			"text": "接口"
		}],
		imgSever:'http://120.37.137.59:9900/upload/' ,  //图片服务器地址
    },
    mutations: {
        updateTabbarIndex(state, index) {
           state.tabbarIndex=index;
        },
    },
	actions:{
		updateTabbarIndex({commit},index){
			commit('updateTabbarIndex',index)
		}
	}
})
export default store