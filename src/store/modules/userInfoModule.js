import { getUserInfoById, editUsername, editUserAddress, editUserSex, editUserSignature } from '../../api/index'


export default {
  // 命名空间
  namespaced: true,
  state: {
    userInfo: {
      address: "",
      account: "",
      headshots: "",
      username: "",
      sex: "",
      signature: "",
      userId: "",
    }
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    setAddress(state, address) {
      state.userInfo.address = address;
    },
    setName(state, name) {
      state.userInfo.username = name;
    },
    setSignature(state, signature) {
      state.userInfo.signature = signature;
    },
    setSex(state, sex) {
      state.userInfo.sex = sex;
    },
    setHeadshots(state, url) {
      state.userInfo.headshots = url;
    },
  },
  actions: {
    asyncSetUserInfo({ commit }, id) {
      //  进行 网络请求获取 用户信息
      getUserInfoById(id).then(res => {
        // console.log(res);
        commit("setUserInfo", res[0]);
      })
    },
    asyncSetName({ commit }, data) {
      editUsername(data).then(res => {
        console.log(res);
        commit("setName", data.value);
      })
    },
    asyncsetAddress({ commit }, data) {
      editUserAddress(data).then(res => {
        console.log(res);
        commit("setAddress", data.value);
      })
    },
    asyncsetSex({ commit }, data) {
      editUserSex(data).then(res => {
        console.log(res);
        commit("setSex", data.value);
      })
    },
    asyncsetSignature({ commit }, data) {
      editUserSignature(data).then(res => {
        console.log(res);
        commit("setSignature", data.value);
      })
    }
  },
  getters: {
    getUserId(state) {
      return state.userInfo.userId;
    }
  }
}