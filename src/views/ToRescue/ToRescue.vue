<template>
  <div class="toRescue">
    <van-nav-bar
      title="救助/领养宠物"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-steps :active="active" @click-step="clickStep">
      <van-step>验证宠物的身份</van-step>
      <van-step>填写救助信息</van-step>
      <van-step>操作完成</van-step>
    </van-steps>
    <div class="content">
      <VerifyQbw v-if="active === 0" @toNext="toNext"></VerifyQbw>
      <FillForm v-if="active === 1" @toNext="toNext"></FillForm>
      <div class="submitResult" v-if="active === 2">
        <h2>提交已完成<van-icon name="success" /></h2>
        <van-button
          plain
          icon="revoke"
          @click="$router.go(-1)"
          block
          hairline
          type="info"
          >返回宠物详情页</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import VerifyQbw from "../../components/Common/VerifyQbw.vue";
import { Step, Steps, NavBar, Icon, Button } from "vant";
import FillForm from "../../components/ToRescue/FillForm.vue";
export default {
  name: "ToRescue",
  components: {
    VerifyQbw,
    FillForm,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toNext(value) {
      this.active = value;
    },
    clickStep(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 6px;
  padding: 10px 6px;
  background-color: #fff;
  color: #303133;
  .submitResult {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    h2 {
      color: #67c23a;
      margin: 10px 0 20px;
    }
  }
}
</style>