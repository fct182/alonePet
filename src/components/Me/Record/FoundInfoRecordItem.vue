<template>
  <div class="foundInfoRecordItem" @click="toPetDetail">
    <van-image
      width="100"
      height="100"
      fit="cover"
      :src="foundInfoRecordListItem.img"
    />
    <div class="info van-ellipsis">
      <p class="van-ellipsis">
        宠物名称：<span>{{ foundInfoRecordListItem.petName }}</span>
      </p>
      <p class="van-ellipsis">
        宠物特征：<span>{{ foundInfoRecordListItem.trait }}</span>
      </p>
      <p class="van-ellipsis">
        发现时间：<span>{{
          foundInfoRecordListItem.createTime | formatDate
        }}</span>
      </p>
      <p class="van-ellipsis">
        发现地点：<span>{{ foundInfoRecordListItem.findAddress }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
  name: "FoundInfoRecordItem",
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    foundInfoRecordListItem: {
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
    toPetDetail() {
      this.$router.push({
        name: "PetDetails",
        params: { id: this.foundInfoRecordListItem.petId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.foundInfoRecordItem {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 10px 8px;
  padding: 10px;
  .van-image {
    margin-right: 15px;
    flex-shrink: 0;
  }
  .info {
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
</style>