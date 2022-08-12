<template>
  <div class="fillForm">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        readonly
        name="username"
        label="当前用户名"
        placeholder="用户名"
        colon
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="trait"
        name="trait"
        label="新增特征"
        autocomplete="off"
        placeholder="填写宠物新增特征"
        colon
        :rules="[{ required: true, message: '新增宠物特征,无新增请填无' }]"
      />
      <van-field
        v-model="loveFood"
        name="loveFood"
        autocomplete="off"
        label="新增喜爱食物"
        placeholder="填写宠物新增喜爱食物,"
        colon
        :rules="[{ required: true, message: '新增宠物喜爱食物,无新增请填无' }]"
      />
      <van-field
        colon
        readonly
        clickable
        name="datetimePicker"
        :value="value"
        label="时间选择"
        placeholder="点击选择时间"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择时间' }]"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        colon
        readonly
        clickable
        name="area"
        :value="address"
        label="地理坐标"
        placeholder="点击选择投喂的地点"
        @click="clickArea"
        :rules="[{ required: true, message: '请选择地点' }]"
      />
      <van-popup v-model="showArea" position="bottom">
        <LocationMap :goBack="false" @saveLocation="saveLocation"></LocationMap>
      </van-popup>
      <van-field
        v-model="addressDesc"
        name="addressDesc"
        label="地点描述"
        autocomplete="off"
        placeholder="填写地点描述"
        colon
        :rules="[{ required: true, message: '地点描述' }]"
      />
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
  RadioGroup,
  Radio,
  DatetimePicker,
  Popup,
  Area,
  Notify,
} from "vant";
import { mapState } from "vuex";
import { areaList } from "@vant/area-data";
import { submitFeed, dealLocation } from "../../api";
import LocationMap from "../Common/LocationMap.vue";

export default {
  name: "FillForm",
  components: {
    LocationMap,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Notify.Component.name]: Notify.Component,
  },
  data() {
    return {
      username: "",
      trait: "",
      loveFood: "",
      value: "",
      currentDate: new Date(),
      showPicker: false,
      address: "",
      showArea: false,
      areaList,
      addressDesc: "",
    };
  },
  mounted() {
    this.username = this.loginInfo.name;
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  methods: {
    clickArea() {
      this.showArea = true;
    },
    saveLocation(value) {
      let arr = JSON.parse(value);
      // console.log(value, arr);
      this.address = value;
      this.showArea = false;
      // 设置地点描述--------使用腾讯位置服务
      this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/?", {
        location: `${arr[1]},${arr[0]}`, // 经纬度
        key: "QLSBZ-KFK3U-QFNVT-2DQ76-7RU4V-MFBO5",
        output: "jsonp", // output必须jsonp   不然会超时
      }).then((res) => {
        console.log(res.result);
        this.addressDesc =
          res.result.address + res.result.formatted_addresses.recommend;
      });
    },
    onSubmit(values) {
      values.userId = this.loginInfo.userId;
      values.petId = parseInt(this.$route.params.id);
      console.log("submit", values);
      // 网络请求
      submitFeed(values).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          // 添加成功
          this.$emit("toNext", 2);
        } else {
          Notify({ type: "danger", message: "提交失败" });
        }
      });
    },
    onConfirm(time) {
      // this.currentDate = time;
      this.value = time.toLocaleDateString();
      this.showPicker = false;
    },
    onConfirm2(values) {
      this.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>