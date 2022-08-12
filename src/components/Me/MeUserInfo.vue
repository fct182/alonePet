<template>
  <div class="userInfo" @click="editUserInfo">
    <van-image
      round
      fit="cover"
      width="75px"
      height="75px"
      :src="userInfo.headshots"
    />
    <div class="info">
      <h2>{{ userInfo.username }}</h2>
      <p>账号：{{ userInfo.account }}</p>
      <p class="van-ellipsis">
        <van-icon name="edit" />
        {{ userInfo.signature }}
      </p>
    </div>
    <van-icon class="rightArrow" name="arrow" />
  </div>
</template>

<script>
import { Image as VanImage, Icon } from "vant";
import { mapState } from "vuex";
export default {
  name: "MeUserInfo",
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
  },
  computed: {
    ...mapState("userInfoModule", ["userInfo"]),
  },
  data() {
    return {};
  },
  methods: {
    editUserInfo() {
      this.$router.push({
        name: "EditInfo",
        params: { id: this.userInfo.userId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.userInfo {
  height: 120px;
  background-color: #fff;
  margin-bottom: 20px;
  .van-image {
    top: -8.5px;
    left: 5px;
  }
  .info {
    width: 255px;
    padding: 10px 0;
    display: inline-block;
    position: relative;
    // top: -30%;
    left: 26px;
    // transform: translateY(50%);
    h2 {
      padding: 10px 0;
    }
    p {
      padding: 5px 0;
    }
  }
  .rightArrow {
    position: relative;
    top: -32px;
    left: 2px;
    height: 24px;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
