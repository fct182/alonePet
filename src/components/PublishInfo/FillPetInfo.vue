<template>
  <div class="fillPetInfo">
    <van-form @submit="onSubmit">
      <van-field
        v-model="petName"
        name="petName"
        label="宠物名"
        placeholder="您第一个发现它，为它取个名吧~"
        autocomplete="off"
        :rules="[{ required: true, message: '记得取名哟~' }]"
      />
      <van-field
        v-model="trait"
        name="trait"
        label="宠物特征"
        placeholder="请输入宠物特征"
        autocomplete="off"
        :rules="[{ required: true, message: '请输入宠物特征' }]"
      />
      <van-field
        name="switch"
        label="您是否已投喂"
        :rules="[{ required: false }]"
      >
        <template #input>
          <van-switch v-model="isFeeding" size="20" />
        </template>
      </van-field>
      <van-field
        v-if="isFeeding"
        v-model="loveFood"
        name="loveFood"
        label="喜爱的食物"
        placeholder="您投喂的哪种食物宠物最喜欢"
        autocomplete="off"
        :rules="[{ required: true, message: '请填写喜爱的食物' }]"
      />
      <van-field
        name="health"
        label="健康状态"
        :rules="[{ required: true, message: '请填写健康状态' }]"
      >
        <template #input>
          <van-radio-group v-model="health" direction="horizontal">
            <van-radio name="健康">健康</van-radio>
            <van-radio name="亚健康">亚健康</van-radio>
            <van-radio name="生病">生病</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        colon
        readonly
        clickable
        name="area"
        :value="addressLoc"
        label="地理坐标"
        placeholder="点击选择发现的地点"
        @click="showArea = true"
        :rules="[{ required: true, message: '请选择地点' }]"
      />
      <van-popup v-model="showArea" position="bottom">
        <LocationMap :goBack="false" @saveLocation="saveLocation"></LocationMap>
      </van-popup>
      <van-field
        v-model="addressStr"
        name="addressStr"
        label="地点描述"
        autocomplete="off"
        placeholder="填写地点描述"
        colon
        :rules="[{ required: true, message: '地点描述' }]"
      />
      <van-field
        readonly
        clickable
        name="createTime"
        :value="value"
        label="发布日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
        :rules="[{ required: true, message: '请填写当前日期' }]"
      />
      <van-field
        name="uploader"
        label="宠物日常照片"
        :rules="[{ required: true, message: '请上传宠物照片' }]"
      >
        <template #input>
          <van-uploader
            :after-read="afterRead"
            v-model="uploader"
            :max-count="4"
          />
        </template>
      </van-field>

      <van-calendar v-model="showCalendar" @confirm="onConfirm" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  Form,
  Field,
  Button,
  Radio,
  RadioGroup,
  Switch,
  Calendar,
  Uploader,
  Popup,
} from "vant";
import { insertPet, uploadPetPic } from "../../api";
import LocationMap from "../Common/LocationMap.vue";
import { mapState } from "vuex";
export default {
  name: "FillPetInfo",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Switch.name]: Switch,
    [Calendar.name]: Calendar,
    [Uploader.name]: Uploader,
    [Popup.name]: Popup,
    LocationMap,
  },
  props: ["qbwId"],
  data() {
    return {
      petName: "",
      trait: "",
      loveFood: "",
      health: "健康",
      isFeeding: false,
      addressStr: "",
      addressLoc: "",
      value: "",
      showCalendar: false,
      uploader: [],
      showArea: false,
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  methods: {
    onSubmit(values) {
      values.address = this.addressLoc;
      values.qbwId = this.qbwId;
      values.userId = this.loginInfo.userId;
      console.log("submit", values);
      // 请求1 携带的数据
      const fileData = values.uploader;
      delete values.uploader;
      // 1. 添加宠物狗信息
      insertPet(values).then((res) => {
        console.log(res);
        this.$emit("update:currentPetId", res.petId);
        if (res.status === 200) {
          // 文本字段的信息上传完成
          let formData = new FormData();
          formData.append("id", res.petId);
          for (const item of fileData) {
            formData.append("pictures", item.file);
          }
          // 2. 上传宠物的日常照片
          uploadPetPic(formData).then((res) => {
            console.log(res);
            if (res.status === 200) {
              // 前往下一步
              this.$emit("nextPart", 2);
            }
          });
        }
      });
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
      this.showCalendar = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    saveLocation(value) {
      let arr = JSON.parse(value);
      console.log(value, arr);
      this.addressLoc = value;
      this.showArea = false;
      // 设置地点描述--------使用腾讯位置服务
      this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/?", {
        location: `${arr[1]},${arr[0]}`, // 经纬度
        key: "QLSBZ-KFK3U-QFNVT-2DQ76-7RU4V-MFBO5",
        output: "jsonp", // output必须jsonp   不然会超时
      }).then((res) => {
        console.log(res.result);
        this.addressStr =
          res.result.address + res.result.formatted_addresses.recommend;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fillPetInfo {
  .van-form {
    /deep/ .address .van-field__control {
      color: #909399;
    }
  }
}
</style>