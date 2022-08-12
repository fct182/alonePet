<template>
  <div class="friends">
    <NavHeader title="聊天室"></NavHeader>
    <!-- 聊天室 Item -->
    <ChatItem
      v-for="item in chatList"
      :key="item.petId"
      :data="item"
    ></ChatItem>
    <van-empty
      v-if="chatList.length === 0"
      description="您还没加入任何聊天室"
    />
    <!-- 底部导航栏 -->
    <NavBottom></NavBottom>
  </div>
</template>

<script>
import { Empty } from "vant";
import NavHeader from "@/components/NavHeader.vue";
import NavBottom from "@/components/NavBottom.vue";
import ChatItem from "../../components/Friends/ChatItem.vue";
import { getUserChatList } from "../../api";
import { mapState } from "vuex";
export default {
  name: "Friends",
  components: {
    NavHeader,
    NavBottom,
    ChatItem,
    [Empty.name]: Empty,
  },
  data() {
    return {
      chatList: [],
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  mounted() {
    getUserChatList(this.loginInfo.userId).then((res) => {
      console.log(res);
      this.chatList = res;
    });
  },
};
</script>

<style lang="less" scoped>
</style>