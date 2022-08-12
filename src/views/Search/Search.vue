<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#4fc08d"
        autofocus
        shape="round"
        placeholder="请输入宠物名或宠物特征"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-empty v-if="!isSearch" image="search" description="请输入搜索内容" />
    <!-- 搜索结果 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { Search, Empty } from "vant";

export default {
  name: "Search",
  components: {
    [Search.name]: Search,
    [Empty.name]: Empty,
  },
  data() {
    return {
      value: "",
      isSearch: false,
      flagNum: 0,
    };
  },
  beforeRouteUpdate(to, from, next) {
    // this.value = this.$route.params.key;
    next();
    // 重新赋值 搜索框
    if (this.flagNum !== 0) {
      if (this.$route.name === "Search") {
        this.isSearch = false;
      }
      this.value = this.$route.params.key;
    }
    this.flagNum++;
  },
  methods: {
    onSearch(val) {
      // console.log(val);
      // 开始搜索HTTP请求
      this.isSearch = true;
      this.$router.push({ name: "SearchResult", params: { key: val } });
    },
    onCancel() {
      // console.log("取消");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  form {
    position: sticky;
    top: 0;
    z-index: 666;
  }
  .van-search {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .van-field__left-icon {
    margin-right: 12px;
  }
}
</style>