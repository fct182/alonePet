<template>
  <div class="feedingItem" :style="css">
    <div class="info" @click="toPetDetail">
      <van-image
        class="img"
        width="100"
        height="100"
        fit="cover"
        :src="data.img"
      />
      <div class="info_desc">
        <p>
          宠物名：<span>{{ data.petName }}</span>
        </p>
        <p>
          宠物特征：<span>{{ data.trait }}</span>
        </p>
        <p>
          喜好食物：<span>{{ data.loveFood }}</span>
        </p>
        <p>
          上次投喂时间：<span>{{ data.lastFeedTime | formatDate }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
  name: "FeedingItem",
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
    css: {
      type: Object,
      default() {
        return {};
      },
    },
    toMethods: {
      type: String,
      default() {
        return "push";
      },
    },
  },
  filters: {
    formatDate(value) {
      return value?.substr(0, 10);
    },
  },
  methods: {
    toPetDetail() {
      // console.log("取宠物详情", this.data.petId);
      this.$router[this.toMethods]({
        name: "PetDetails",
        params: { id: this.data.petId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.feedingItem {
  box-sizing: border-box;
  margin: 10px 8px;
  // background-color: #fff;
  // border: 2px solid #dcdfe6;
  background: linear-gradient(135deg, #aceae1 0%, #ebadb6 100%);
  border-radius: 7px;
  // box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  .info {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      margin-right: 15px;
    }
    .info_desc {
      flex: 1;
      p {
        font-size: 14px;
        padding: 5px 0;
        color: #303133;
        span {
          color: #606266;
        }
      }
    }
  }
}
</style>