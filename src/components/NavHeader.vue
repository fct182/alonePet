<template>
  <van-nav-bar fixed placeholder :title="title" />
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "NavHeader",
  components: {
    [NavBar.name]: NavBar,
  },
  props: ["title"],
};
</script>

<style lang="css" scoped>
/deep/ .van-nav-bar__content {
  background-color: #5fb878;
}
/deep/ .van-nav-bar__title {
  color: white !important;
  font-size: 16px;
}
</style>