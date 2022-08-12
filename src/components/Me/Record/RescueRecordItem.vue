<template>
  <div class="rescueRecordItem" @click="toPetDetail">
    <van-image
      width="100"
      height="100"
      fit="cover"
      :src="rescueRecordListItem.img"
    />
    <div class="info">
      <p>
        宠物名称：<span>{{ rescueRecordListItem.petName }}</span>
      </p>
      <p>
        救助类别：<span
          >{{ rescueRecordListItem.typeDesc }}({{
            rescueRecordListItem.type
          }})</span
        >
      </p>
      <p>
        救助时间：<span>{{ rescueRecordListItem.creatTime | formatDate }}</span>
      </p>
      <p>
        救助地点：<span>{{ rescueRecordListItem.address }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
  name: "RescueRecord",
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    rescueRecordListItem: {
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
        params: { id: this.rescueRecordListItem.petId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rescueRecordItem {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 10px 8px;
  padding: 10px;
  .van-image {
    margin-right: 15px;
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