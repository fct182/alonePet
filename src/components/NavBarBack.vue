<template>
  <div class="navBack">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "NavBarBack",
  props: ["title"],
  components: {
    [NavBar.name]: NavBar,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.navBack {
  /deep/ .van-nav-bar__content {
    background-color: #ebeef5;
  }
}
</style>