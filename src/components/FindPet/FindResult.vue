<template>
  <div class="findResult">
    <h2>找寻结果:</h2>
    <h4 v-if="isSuccess" class="success">
      <span>已成功匹配到到对应宠物！</span>
      <van-icon name="success" />
      <p>点击下方链接即可查看<van-icon name="arrow-down" /></p>
    </h4>
    <h4 v-else class="error">
      <span>未匹配到到相应宠物！</span>
      <van-icon name="cross" />
    </h4>
    <FeedingItem
      v-if="isSuccess"
      :data="data"
      toMethods="replace"
    ></FeedingItem>
  </div>
</template>

<script>
import { Icon } from "vant";
import FeedingItem from "../Home/FeedingItem.vue";
import { getPetInfoById } from "../../api";
export default {
  name: "FindResult",
  components: {
    FeedingItem,
    [Icon.name]: Icon,
  },
  props: ["existPetId"],
  data() {
    return {
      isSuccess: true,
      data: {},
    };
  },
  mounted() {
    console.log(this.existPetId);
    if (this.existPetId < 0) {
      this.isSuccess = false; // 未找到相应的宠物
    } else {
      this.isSuccess = true;
      // 获取宠物的信息
      getPetInfoById(this.existPetId).then((res) => {
        console.log(res);
        this.data = res;
      });
    }
  },
};
</script>

<style lang="less" scoped>
.findResult {
  h4 {
    padding: 8px;
    text-align: center;
    font-size: 18px;
  }
  .success {
    color: #67c23a;
    p {
      color: #409eff;
      padding-top: 10px;
      font-size: 14px;
    }
  }
  .error {
    color: #f56c6c;
  }
}
</style>