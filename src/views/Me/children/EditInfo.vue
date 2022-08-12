<template>
  <div class="editInfo">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell
        title="头像"
        center
        size="large"
        is-link
        @click="editProfilePhoto"
      >
        <template #right-icon>
          <van-image
            round
            fit="cover"
            width="60"
            height="60"
            :src="userInfo.headshots"
          />
          <van-icon class="rightArrow" name="arrow" />
          <van-uploader
            :after-read="afterRead"
            style="display: none"
            ref="editPicture"
            :max-size="500 * 1024"
            @oversize="onOversize"
          />
        </template>
      </van-cell>
      <van-cell
        title="名字"
        :value="userInfo.username"
        is-link
        :to="`/editDetailInfo?name=名字&value=${userInfo.username}`"
      />
      <van-cell title="账号" :value="userInfo.account" />
      <van-cell
        title="性别"
        :value="userInfo.sex"
        is-link
        :to="'/editDetailInfo?name=性别&value=' + userInfo.sex"
      />
      <van-cell
        title="地区"
        :value="userInfo.address"
        is-link
        :to="`/editDetailInfo?name=地区&value=${userInfo.address}`"
      />
      <van-cell
        title="个性签名"
        center
        :value="userInfo.signature"
        is-link
        :to="`/editDetailInfo?name=个性签名&value=${userInfo.signature}`"
      />
    </van-cell-group>
  </div>
</template>

<script>
import {
  NavBar,
  Cell,
  CellGroup,
  Image as VanImage,
  Icon,
  Uploader,
} from "vant";
import { mapState, mapMutations } from "vuex";
import { uploadHeadshots } from "../../../api/index";
export default {
  name: "EditInfo",
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("userInfoModule", ["userInfo"]),
  },
  mounted() {},
  methods: {
    ...mapMutations("userInfoModule", ["setHeadshots"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    editProfilePhoto(e) {
      // 头像点击事件
      this.$refs.editPicture.chooseFile();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formData = new FormData();
      formData.append("headshots", file.file);
      formData.append("id", this.$route.params.id);
      file.status = "uploading";
      file.message = "上传中...";
      uploadHeadshots(formData).then((res) => {
        file.status = "done";
        file.message = "上传成功";
        this.setHeadshots(res.url);
      });
    },
    onOversize(file) {
      console.log(file, "文件大小不能超过 500kb");
    },
  },
};
</script>

<style lang="less" scoped>
.rightArrow {
  width: 16px;
  height: 24px;
  line-height: 24px;
  margin-left: 10px;
}
</style>