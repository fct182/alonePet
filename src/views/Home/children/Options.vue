<template>
  <div class="options">
    <van-button
      @click="sendMsg"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
    >
      发现独行Pet
    </van-button>
    <van-button
      @click="findPet"
      color="linear-gradient(to right, #39bda7, #27c8b7)"
    >
      寻找丢失爱宠
    </van-button>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "Options",
  components: {
    [Button.name]: Button,
  },
  methods: {
    sendMsg() {
      console.log("发布招领信息");
      this.$router.push({ name: "PublishZLInfo" });
    },
    findPet() {
      console.log("寻找丢失爱宠");
      this.$router.push({ name: "FindPet" });
    },
  },
};
</script>

<style lang="less" scoped>
.options {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  background: #fff;
  margin: 6px 0;
}
</style>