<template>
  <div class="petBasicInfo">
    <div class="content van-hairline--bottom">
      <h2>宠物名：</h2>
      <p>{{ data.petName }}</p>
    </div>
    <div class="content van-hairline--bottom">
      <h2>宠物特征：</h2>
      <p>{{ data.trait }}</p>
    </div>
    <div class="content van-hairline--bottom">
      <h2>喜爱的食物：</h2>
      <p>{{ data.loveFood }}</p>
    </div>
    <div class="content">
      <h2>上次投喂地点和时间：</h2>
      <p>{{ data.newAddressLoc }}( {{ data.lastFeedTime | formatDate }} )</p>
    </div>
    <div class="content">
      <van-grid :column-num="3">
        <van-grid-item icon="shield-o" :text="`健康状态: ${data.health}`" />
        <van-grid-item icon="records" :text="`投喂次数: ${data.feedingNum}`" />
        <van-grid-item icon="info-o" :text="`当前状态: ${petState}`" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from "vant";
export default {
  name: "PetBasicInfo",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
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
    return {};
  },
  computed: {
    petState() {
      return this.data.state === 0 ? "流浪" : "被领养";
    },
  },
  filters: {
    formatDate(value) {
      return value?.substr(0, 10);
    },
  },
};
</script>

<style lang="less" scoped>
.petBasicInfo {
  padding: 10px;
  .content {
    padding: 10px 0;
    h2 {
      display: inline-block;
      margin-bottom: 5px;
    }
    p {
      display: inline-block;
      font-size: 16px;
      padding-left: 20px;
    }
    /deep/ .van-icon {
      color: #409eff;
    }
  }
}
</style>