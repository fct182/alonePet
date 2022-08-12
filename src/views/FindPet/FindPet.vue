<template>
  <div class="findPet">
    <nav-bar-back :title="title"></nav-bar-back>
    <van-steps :active="active" active-icon="success" active-color="#38f">
      <van-step>上传您宠物的犬鼻纹照片</van-step>
      <van-step>比对中</van-step>
      <van-step>比对完成</van-step>
    </van-steps>
    <div class="content">
      <UploadPetQBW
        :existPetId.sync="existPetId"
        v-if="active === 0"
        @nextPart="toNextPart"
      ></UploadPetQBW>
      <CompareState v-if="active === 1" @nextPart="toNextPart"></CompareState>
      <FindResult v-if="active === 2" :existPetId="existPetId"></FindResult>
    </div>
  </div>
</template>

<script>
import { Step, Steps } from "vant";
import NavBarBack from "../../components/NavBarBack.vue";
import UploadPetQBW from "../../components/FindPet/UploadPetQBW.vue";
import CompareState from "../../components/FindPet/CompareState.vue";
import FindResult from "../../components/FindPet/FindResult.vue";
export default {
  components: {
    NavBarBack,
    UploadPetQBW,
    CompareState,
    FindResult,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  name: "FindPet",
  data() {
    return {
      title: "寻找丢失宠物",
      active: 0,
      existPetId: -1,
    };
  },
  methods: {
    toNextPart(value) {
      this.active = value;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 8px;
  padding: 10px;
  background-color: #fff;
}
</style>