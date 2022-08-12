import router from '.'
import store from '../store'

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {  // 当前路由页面需要登录
    if (store.state.loginInfo.isLogin) { // 当前已经登录了
      next();
    } else {
      router.push({ name: "Login", params: { path: to.fullPath } });
    }
  } else {
    next();
  }
})