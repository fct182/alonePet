<template>
  <div class="pubulishInfo">
    <NavBarBack :title="title"></NavBarBack>
    <van-steps :active="active" @click-step="clickSteap">
      <van-step>拍照犬鼻纹照片</van-step>
      <van-step>填写宠物信息</van-step>
      <van-step>发布成功</van-step>
    </van-steps>
    <div class="content">
      <UploadQbw
        v-if="active === 0"
        @nextPart="nextPart"
        :currentQbwId.sync="currentQbwId"
      ></UploadQbw>
      <FillPetInfo
        :qbwId="currentQbwId"
        v-if="active === 1"
        @nextPart="nextPart"
        :currentPetId.sync="currentPetId"
      ></FillPetInfo>
      <PublicSuccess
        :currentPetId="currentPetId"
        v-if="active === 2"
      ></PublicSuccess>
    </div>
  </div>
</template>

<script>
import NavBarBack from "../../components/NavBarBack.vue";
import { Step, Steps } from "vant";
import UploadQbw from "../../components/PublishInfo/UploadQbw.vue";
import FillPetInfo from "../../components/PublishInfo/FillPetInfo.vue";
import PublicSuccess from "../../components/PublishInfo/PublicSuccess.vue";
export default {
  components: {
    NavBarBack,
    UploadQbw,
    FillPetInfo,
    PublicSuccess,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  name: "PubulishInfo",
  data() {
    return {
      title: "发现独行Pet",
      active: 0,
      currentQbwId: 0,
      currentPetId: 0,
    };
  },
  methods: {
    clickSteap(index) {
      this.active = index;
    },
    nextPart(value) {
      this.active = value;
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
}
</style>