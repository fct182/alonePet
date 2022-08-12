<template>
  <van-tabbar route fixed placeholder>
    <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/friends">
      聊天室
    </van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="user-circle-o">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "NavBottom",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>