<template>
  <div class="chatItem" @click="toChatRoom">
    <van-image round width="60" height="60" fit="cover" :src="data.chatImg" />
    <div class="content van-ellipsis">
      <div class="chatTitle van-ellipsis">{{ data.chatTitle }}</div>
      <div class="contentInfo van-ellipsis">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
  name: "ChatItem",
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      msg: "欢迎进入聊天室~~",
    };
  },
  methods: {
    toChatRoom() {
      console.log("去聊天室", this.data.chatTitle);
      this.$router.push({
        name: "ChatItemRoom",
        params: { id: this.data.petId, title: this.data.chatTitle },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.chatItem {
  padding: 0 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .van-image {
    flex-shrink: 0;
  }
  .content {
    flex: 1;
    padding: 15px;
    border-bottom: 1px solid #dcdfe6;
    .chatTitle {
      font-size: 16px;
      color: #303133;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .contentInfo {
      height: 16px;
      color: #909399;
    }
  }
}
</style>