<template>
  <div class="nearlyPet">
    <div class="topIcon"></div>
    <h2>附近的流浪Pet</h2>
    <van-tabs v-model="active" animated swipeable :before-change="beforeChange">
      <van-tab title="今日未投喂">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <FeedingList :list="list"></FeedingList>
        </van-list>
      </van-tab>
      <van-tab title="今日投喂">
        <van-list
          v-model="loading1"
          :finished="finished1"
          finished-text="没有更多了"
          @load="onLoad1"
        >
          <FeedingList :list="list2" :css="css"></FeedingList>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, List } from "vant";
import FeedingList from "../../../components/Home/FeedingList.vue";
import { getAllPartInfo } from "../../../api";
export default {
  name: "NearlyPet",
  components: {
    FeedingList,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
  },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      loading1: false,
      finished1: false,
      css: {
        background:
          "linear-gradient(135deg, #d5dee7 0%, #c9ffbf 0%, #ffafbd 100%)",
      },
      list: [],
      listCount: 0, // 未投喂宠物的总体数量
      Limit: 5, // 每次请求的数据量
      ListOffset: 0, // 未投喂的请求数据的偏移量
      list2: [],
      list2Count: 0, // 已投喂宠物的总体数量
      List2Offset: 0, // 已投喂的请求数据的偏移量
    };
  },
  mounted() {
    // 网络请求 未投喂宠物狗的信息
    // getAllPartInfo(0, this.Limit, this.ListOffset).then((res) => {
    //   console.log("未投喂", res);
    //   this.listCount = res.count;
    //   this.list = res.data;
    //   this.ListOffset += this.Limit;
    // });
  },
  methods: {
    // 异步加载今日未投喂
    onLoad() {
      console.log("今日未投喂---触发数据更新啦");
      // 请求数据
      getAllPartInfo(0, this.Limit, this.ListOffset).then((res) => {
        this.listCount = res.count;
        this.list = [...this.list, ...res.data];
        this.ListOffset += this.Limit;
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.listCount) {
          // 数据全部加载完成
          this.finished = true;
        }
      });
    },
    // 异步加载今日已投喂
    onLoad1() {
      console.log("今日已投喂---触发数据更新啦");
      // 请求数据
      getAllPartInfo(1, this.Limit, this.List2Offset).then((res) => {
        this.list2 = [...this.list2, ...res.data];
        this.List2Offset += this.Limit;
        // 加载状态结束
        this.loading1 = false;
        if (this.list2.length >= this.list2Count) {
          // 数据全部加载完成
          this.finished1 = true;
        }
      });
    },
    // 切换投喂选项
    beforeChange(index) {
      // 返回 false 表示阻止此次切换
      // 返回 Promise 来执行异步逻辑
      return new Promise((resolve) => {
        // 在 resolve 函数中返回 true 或 false
        if (index === 1) {
          // 切换到今日投喂
          // 网络请求 已投喂宠物狗的信息
          if (this.List2Offset === 0) {
            // 第一次请求
            getAllPartInfo(1, this.Limit, this.List2Offset).then((res) => {
              console.log("已投喂", res);
              this.list2Count = res.count;
              this.list2 = res.data;
              this.List2Offset += this.Limit;
              resolve(true);
            });
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.nearlyPet {
  background-color: #fff;
  padding: 6px 0;
  .topIcon {
    width: 50px;
    height: 4px;
    margin-top: 6px;
    margin-left: 6px;
    background-color: orange;
    margin-bottom: 4px;
  }
  h2 {
    padding-left: 6px;
    font-size: 18px;
    color: #323233;
    font-family: PingFangSC-Medium;
    margin-bottom: 12px;
  }
}
</style>