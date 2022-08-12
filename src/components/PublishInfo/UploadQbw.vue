<template>
  <div class="uploadQbw">
    <h2>上传犬鼻纹照片</h2>
    <p>注: 用于鉴定该流浪宠物是否已经被其他用户上传</p>
    <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />
    <h3 v-if="isUploaded">
      检验结果:
      <span :style="{ color: isSuccess ? '#67c23a' : '#F56C6C' }">{{
        isSuccess ? "数据库中未发现该宠物狗" : "该宠物狗已存在数据库中"
      }}</span>
      <van-icon name="success" color="#67C23A" v-if="isSuccess" />
      <van-icon name="cross" color="#F56C6C" v-else />
    </h3>
    <div :style="{ margin: isSuccess ? '16px' : '0' }" v-if="isUploaded">
      <van-button round block type="info" v-if="isSuccess" @click="nextPart"
        >下一步</van-button
      >
      <FeedingItem v-else :data="data" toMethods="replace"></FeedingItem>
    </div>
  </div>
</template>

<script>
import { Uploader, Icon, Button } from "vant";
import { uploadQbw, getPetInfoById } from "../../api";
import FeedingItem from "../Home/FeedingItem.vue";
export default {
  name: "UploadQbw",
  components: {
    FeedingItem,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  data() {
    return {
      isSuccess: false, // 表示判断的结果
      isUploaded: false, // 表示判断的状态
      fileList: [],
      data: {},
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      file.status = "uploading";
      file.message = "上传中...";
      let formData = new FormData();
      formData.append("qbw", file.file);
      // 网络请求
      uploadQbw(formData).then((res) => {
        console.log(res);
        this.isUploaded = true; // 判断完成
        if (res.status === 200) {
          // 数据库中未匹配到相同的犬鼻纹
          this.isSuccess = true;
          file.status = "done";
          file.message = "上传成功";
          this.$emit("update:currentQbwId", res.insertId);
        } else {
          // 该宠物已经存在数据库中
          this.fileList = [
            {
              url: `http://localhost:3000/upload/qbw/${res.filename}`,
              isImage: true,
              message: "已存在数据库中",
            },
          ];
          // 请求该 宠物的详细信息 ID---> res.existPetId
          getPetInfoById(res.existPetId).then((res) => {
            console.log(res);
            res.img = res.imgs[0];
            this.data = res;
          });
        }
      });
    },
    nextPart() {
      if (this.isSuccess) {
        this.$emit("nextPart", 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.uploadQbw {
  p {
    margin-left: 10px;
    color: #909399;
  }
  .van-uploader {
    top: 10px;
    left: 126px;
  }
  h3 {
    margin: 20px 10px 10px;
  }
}
</style>