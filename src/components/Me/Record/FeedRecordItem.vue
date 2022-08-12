<template>
  <div class="feedRecordItem">
    <div class="info" @click="ToPetDetails">
      <van-image
        class="img"
        width="100"
        height="100"
        fit="cover"
        :src="feedRecordListItem.img"
      />
      <div class="info_desc van-ellipsis">
        <p class="van-ellipsis">
          宠物名称：<span>{{ feedRecordListItem.petName }}</span>
        </p>
        <p class="van-ellipsis">
          喜好食物：<span>{{ feedRecordListItem.loveFood }}</span>
        </p>
        <p class="van-ellipsis">
          投喂时间：<span>{{
            feedRecordListItem.lastFeedTime | formatDate
          }}</span>
        </p>
        <p class="van-ellipsis">
          投喂地点：<span>{{ feedRecordListItem.newAddressLoc }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
  name: "FeedRecordItem",
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    feedRecordListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    formatDate(value) {
      return value?.substr(0, 10);
    },
  },
  methods: {
    ToPetDetails() {
      this.$router.push({
        name: "PetDetails",
        params: { id: this.feedRecordListItem.petId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.feedRecordItem {
  margin: 10px 8px;
  background-color: #fff;
  .info {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      margin-right: 15px;
      flex-shrink: 0;
    }
    .info_desc {
      flex: 1;
      p {
        font-size: 14px;
        padding: 5px 0;
        color: #303133;
        span {
          color: #909399;
        }
      }
    }
  }
}
</style>