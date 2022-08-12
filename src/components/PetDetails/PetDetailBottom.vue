<template>
  <div class="petBottom">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="聊天室" @click="onClickIcon" />
      <van-goods-action-button
        type="primary"
        text="救助 / 领养"
        @click="onClickButton1"
      />
      <van-goods-action-button
        type="danger"
        text="去投喂"
        @click="onClickButton2"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Notify } from "vant";
import { insertChatRecord } from "../../api";
export default {
  name: "PetDetailBottom",
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Notify.Component.name]: Notify.Component,
  },
  props: ["date", "info"],
  methods: {
    onClickIcon() {
      // 为当前用户 添加 该宠物的聊天室记录
      insertChatRecord(this.info).then((res) => {
        console.log(res);
        this.$router.push({
          name: "Friends",
        });
      });
    },
    onClickButton1() {
      this.$router.push({
        name: "ToRescue",
        params: { id: this.$route.params.id },
      });
    },
    onClickButton2() {
      if (
        new Date(this.date).toLocaleDateString() ==
        new Date().toLocaleDateString()
      ) {
        Notify({ type: "warning", message: "今日宠物已被投喂" });
      } else {
        this.$router.push({
          name: "ToFeed",
          params: { id: this.$route.params.id },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.petBottom {
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 50px;
  }
  .van-goods-action {
    z-index: 9999;
  }
}
</style>