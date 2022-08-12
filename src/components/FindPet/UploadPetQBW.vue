<template>
  <div class="uploadPetQbw">
    <h2>上传犬鼻纹照片</h2>
    <p>注: 用于鉴定该流浪宠物是否已经被其他用户上传</p>
    <van-uploader :after-read="afterRead" :max-count="1" />
  </div>
</template>

<script>
import { Uploader } from "vant";
import { findMyPet } from "../../api";
export default {
  name: "UploadPetQBW",
  components: {
    [Uploader.name]: Uploader,
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      file.status = "uploading";
      file.message = "上传中...";
      let formdata = new FormData();
      formdata.append("qbw", file.file);
      // 网络请求
      findMyPet(formdata).then((res) => {
        console.log(res);
        if (res.status === 400) {
          // 数据库中 找到 对应的宠物存在
          this.$emit("update:existPetId", res.existPetId);
        }
        this.$emit("nextPart", 1);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.uploadPetQbw {
  color: #303133;
  p {
    margin-left: 10px;
    color: #909399;
  }
  .van-uploader {
    margin-bottom: 20px;
    top: 18px;
    left: 126px;
  }
  h3 {
    margin: 20px 10px 10px;
  }
}
</style>