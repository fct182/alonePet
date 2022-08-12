<template>
  <div class="me">
    <van-nav-bar fixed placeholder :border="false" />
    <!-- 用户信息展示 -->
    <MeUserInfo class="container" />
    <!-- 用户操作列表展示 -->
    <MeUserOperation />
    <!-- 底部导航栏 -->
    <NavBottom></NavBottom>
  </div>
</template>

<script>
import { NavBar } from "vant";
import MeUserInfo from "../../components/Me/MeUserInfo.vue";
import MeUserOperation from "../../components/Me/MeUserOperation.vue";
import NavBottom from "@/components/NavBottom.vue";

export default {
  name: "Me",
  components: {
    MeUserInfo,
    MeUserOperation,
    [NavBar.name]: NavBar,
    NavBottom,
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 10px;
}
</style>
