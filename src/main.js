import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'//注意，一定要引用至index.js文件层面，之前只引用到了store文件夹，所以导致vuex一直不能使用
import './plugins/element.js'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import qs from 'qs'


// 添加请求拦截器，在请求头中加token,实现token验证,注，此操作般至plugins/axios.js中了
// axios.interceptors.request.use(
//     config => {
//         console.log(config+"xxxxxxxxxxxxxx")
//       // if (localStorage.getItem('Authorization')) {
//         // config.headers.Authorization = localStorage.getItem('Authorization');
//         config.headers.Authorization = window.sessionStorage.getItem('token');
//       // }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     });



Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ambq68D76kV3g1UhSVXsG2sjRQq7Ob7D'
})

Vue.config.productionTip = false
//将echarts绑定到vue的原型上
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
