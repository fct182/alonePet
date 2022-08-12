<template>
  <div class="publishSuccess">
    <h2>提交已完成<van-icon name="success" /></h2>
    <van-button
      round
      block
      type="info"
      replace
      :to="`/petDetails/${currentPetId}`"
      color="linear-gradient(65deg, #d9afd9  0%, #97d9e1 100%)"
      >前往查看宠物详情页<van-icon name="arrow"
    /></van-button>
  </div>
</template>

<script>
import { Icon, Button } from "vant";
export default {
  name: "PublishSuccess",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  props: ["currentPetId"],
};
</script>

<style lang="less" scoped>
.publishSuccess {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  h2 {
    color: #67c23a;
    margin: 10px 0 20px;
  }
  button {
    margin-bottom: 20px;
  }
}
</style>