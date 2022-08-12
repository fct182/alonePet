<template>
  <div class="searchResult">
    <!-- <h1>搜索结果: {{ this.$route.params.key }}</h1> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <FeedingItem
        v-for="item in dataList"
        :key="item.petId"
        :data="item"
      ></FeedingItem>
    </van-list>
  </div>
</template>

<script>
import { List } from "vant";
import FeedingItem from "../../../components/Home/FeedingItem.vue";
import { getSearchPet } from "../../../api";
export default {
  name: "SearchResult",
  components: {
    [List.name]: List,
    FeedingItem,
  },
  data() {
    return {
      dataList: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {
    console.log(this.$route.params);
    getSearchPet(this.$route.params.key).then((res) => {
      // console.log("搜索的结果", res);
      this.dataList = res;
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    // 进行网络请求
    getSearchPet(this.$route.params.key).then((res) => {
      // console.log("搜索的结果2", res);
      this.dataList = res;
    });
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // 数据全部加载完成
      this.finished = true;
    },
  },
};
</script>

<style>
</style>