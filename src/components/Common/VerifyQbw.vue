<template>
  <div class="verifyQbw">
    <h2>上传犬鼻纹照片</h2>
    <p>注: 用于鉴定当前领养 / 救助的流浪宠物狗的身份</p>
    <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />
    <van-button
      v-if="isVerifySuccess === 0"
      type="primary"
      loading
      loading-text="等待上传照片验证..."
      block
      >验证成功，下一步</van-button
    >
    <van-button v-if="isVerifySuccess === -1" type="warning" block
      >验证失败请重新验证</van-button
    >
    <van-button v-if="isVerifySuccess === 1" type="info" block @click="toNext"
      >验证成功，下一步</van-button
    >
  </div>
</template>

<script>
import { Uploader, Button } from "vant";
import { verifyPetQbw } from "../../api";
export default {
  name: "VerifyQbw",
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
  },
  data() {
    return {
      fileList: [],
      isVerifySuccess: 0, // -1 表示验证失败，0表示等待验证，1表示验证成功
    };
  },
  methods: {
    afterRead(file) {
      console.log(file);
      // 进行宠物狗的身份验证
      let formdata = new FormData();
      formdata.append("qbw", file.file);
      verifyPetQbw(this.$route.params.id, formdata).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.isVerifySuccess = 1;
        } else {
          this.isVerifySuccess = -1;
        }
      });
    },
    toNext() {
      this.$emit("toNext", 1);
    },
  },
};
</script>

<style lang="less" scoped>
.verifyQbw {
  p {
    margin-left: 10px;
    color: #909399;
  }
  .van-uploader {
    top: 10px;
    left: 126px;
  }
  .van-button {
    margin-top: 20px;
    margin-bottom: 15px;
  }
}
</style>