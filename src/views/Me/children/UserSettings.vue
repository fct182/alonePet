<template>
  <div class="userSettings">
    <nav-bar-back title="设置"></nav-bar-back>
    <van-cell title="关于本软件" is-link @click="show = true" />
    <van-cell title="退出登录" is-link @click="loginOut" />
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
      closeable
    >
      <div class="softwareInfo">
        <p><span>软件名称：</span>独行Pet之家</p>
        <p>
          <span>软件功能：</span> 流浪宠物狗招领、救助和投喂于一体的互助WEB应用
        </p>
        <p><span>开发人员：</span>付常涛</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import NavBarBack from "../../../components/NavBarBack.vue";
import { Cell, CellGroup, Popup } from "vant";
import { mapMutations } from "vuex";
export default {
  name: "UserSettings",
  components: {
    NavBarBack,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapMutations(["removeLoginInfo"]),
    loginOut() {
      // 清除 store 的登录状态
      this.removeLoginInfo();
      // 清除 localstorage 中的信息
      localStorage.removeItem("userInfo");
      // 跳转到登录页面
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>

<style lang="less" scoped>
.userSettings {
  .van-cell {
    margin: 15px 0;
  }
  .van-popup {
    display: flex;
    justify-content: center;
    align-items: center;
    .softwareInfo {
      width: 70%;
      height: 70%;
      font-size: 14px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      p {
        padding: 15px 0;
        span {
          font-weight: 600;
        }
      }
    }
  }
}
</style>