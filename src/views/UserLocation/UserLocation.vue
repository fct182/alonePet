<template>
  <div class="userLocation">
    <van-nav-bar
      title="选择您的位置"
      left-text="返回"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    />
    <LocationMap></LocationMap>
  </div>
</template>

<script>
import { NavBar } from "vant";
import LocationMap from "../../components/Common/LocationMap.vue";
export default {
  name: "UserLocation",
  components: {
    [NavBar.name]: NavBar,
    LocationMap,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.userLocation {
}
</style>