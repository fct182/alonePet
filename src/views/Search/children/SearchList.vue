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
        :key="item.id"
        :data="item"
      ></FeedingItem>
    </van-list>
  </div>
</template>

<script>
import { List } from "vant";
import FeedingItem from "../../../components/Home/FeedingItem.vue";
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
    console.log(this.$route.params.key, "进行搜索的网络请求");
    this.dataList = [
      {
        id: "888",
        trait: this.$route.params.key,
        loveFood: "火腿肠、XX狗粮",
        lastFeedTime: "2022/01/24",
        img: "https://img2.baidu.com/it/u=262209693,3345130075&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
      },
      {
        id: "666",
        trait: this.$route.params.key,
        loveFood: "鱼油、墨鱼干猫粮",
        lastFeedTime: "2022/03/12",
        img: "https://img01.yzcdn.cn/vant/cat.jpeg",
      },
    ];
  },
  beforeRouteUpdate(to, from) {
    this.$route.params.key = to.params.key;
    console.log("重新搜索", to.params.key);
    this.dataList = [
      {
        id: "asd",
        trait: this.$route.params.key,
        loveFood: "ssss",
        lastFeedTime: "2022/01/24",
        img: "https://img2.baidu.com/it/u=262209693,3345130075&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
      },
      {
        id: "asda",
        trait: this.$route.params.key,
        loveFood: "ssss",
        lastFeedTime: "2022/03/12",
        img: "https://img01.yzcdn.cn/vant/cat.jpeg",
      },
    ];
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.dataList.push({
            id: this.dataList.length + 1,
            trait: this.$route.params.key,
            loveFood: "火腿肠、XX狗粮",
            lastFeedTime: "2022/01/24",
            img: "https://img2.baidu.com/it/u=262209693,3345130075&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
          });
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.dataList.length >= 2) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style>
</style>