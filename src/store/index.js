import Vue from 'vue'
import Vuex from 'vuex'
import userInfoModule from './modules/userInfoModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginInfo: { // 记录用户状态
      isLogin: false,
      name: "",
      token: "",
      userId: ""
    },
    nowLocation: [103.95501, 30.7783]  // 初始位置的地理坐标
  },
  mutations: {
    setLoginInfo(state, user) {
      state.loginInfo = user;
    },
    removeLoginInfo(state) {
      state.loginInfo = {
        name: "",
        token: "",
        isLogin: false,
        userId: ""
      }
    },
    editLocation(state, location) {
      state.nowLocation = location;
    }
  },
  actions: {
    asyncGetLoginInfo({ commit }, loginInfo) {
      // 本地持久化
      localStorage.setItem("userInfo", JSON.stringify(loginInfo));
      commit("setLoginInfo", loginInfo);
    }
  },
  modules: {
    userInfoModule
  }
})
