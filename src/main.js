import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant';
Vue.use(Lazyload);
// jsonp 请求方式----this.$jsonp
import { VueJsonp } from "vue-jsonp";
Vue.use(VueJsonp);
// 初始化样式
import "@/assets/css/reset.css"
// 路由  验证权限管理
import "./router/verifyPermission.js"

Vue.config.productionTip = false

const userInfo = localStorage.getItem("userInfo");
// 登录状态持久化
if (userInfo) {
  const userInfoObj = JSON.parse(userInfo);
  // 1. 保存登录状态
  store.commit("setLoginInfo", userInfoObj);
  // 2. 请求用户的信息
  store.dispatch("userInfoModule/asyncSetUserInfo", userInfoObj.userId);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
