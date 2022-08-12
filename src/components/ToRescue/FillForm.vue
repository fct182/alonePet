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
        name="type"
        label="救助类别"
        colon
        :rules="[{ required: true, message: '请选择救助类别' }]"
      >
        <template #input>
          <van-radio-group v-model="type" direction="horizontal">
            <van-radio name="救助">救助</van-radio>
            <van-radio name="领养">领养</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="typeDesc"
        name="typeDesc"
        label="救助描述"
        autocomplete="off"
        placeholder="请填写描述,如：送医治疗"
        :rules="[{ required: true, message: '请填写救助描述' }]"
      />
      <van-field
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
        readonly
        clickable
        name="area"
        :value="address"
        label="地点选择"
        placeholder="点击选择省市区"
        @click="clickArea"
        :rules="[{ required: true, message: '请选择地点' }]"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          ref="areaSelect"
          :area-list="areaList"
          @confirm="onConfirm2"
          @cancel="showArea = false"
        />
      </van-popup>
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
import { submitHelp } from "../../api";
export default {
  name: "FillForm",
  components: {
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
      type: "",
      typeDesc: "",
      value: "",
      currentDate: new Date(),
      showPicker: false,
      address: "",
      showArea: false,
      areaList,
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
      this.$nextTick(() => {
        this.$refs.areaSelect.reset("510000");
      });
    },
    onSubmit(values) {
      values.userId = this.loginInfo.userId;
      values.petId = parseInt(this.$route.params.id);
      console.log("submit", values);
      // 网络请求
      submitHelp(values).then((res) => {
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