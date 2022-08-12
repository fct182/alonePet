<template>
  <div class="editDetailInfo">
    <van-nav-bar
      :title="'更改' + title"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 名字、个性签名更改 -->
    <div v-if="title == '名字' || title == '个性签名'">
      <van-cell-group>
        <van-field
          v-model="value"
          type="textarea"
          placeholder="请输入"
          rows="1"
          autosize
          autofocus
        />
      </van-cell-group>
      <div class="tips" v-if="title === '名字'">
        好名字可以让你的朋友更容易记住你哟。
      </div>
    </div>
    <!-- 性别更改 -->
    <div v-if="title == '性别'">
      <van-radio-group v-model="value">
        <van-cell-group>
          <van-cell title="男" clickable @click="value = '男'">
            <template #right-icon>
              <van-radio name="男" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="value = '女'">
            <template #right-icon>
              <van-radio name="女" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <!-- 地址更改 -->
    <div class="address" v-if="title == '地区'">
      <van-cell-group>
        <van-field v-model="value" label="当前地区" readonly />
      </van-cell-group>
      <van-area
        title="选择地区"
        @confirm="addressConfirm"
        :area-list="areaList"
        :columns-num="2"
        cancel-button-text=" "
        visible-item-count="10"
      />
    </div>
  </div>
</template>

<script>
import { NavBar, Field, RadioGroup, Radio, Cell, CellGroup, Area } from "vant";
// 引入省市区数据
import { areaList } from "@vant/area-data";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditDetailInfo",
  data() {
    return {
      title: this.$route.query.name,
      value: this.$route.query.value,
      areaList,
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Area.name]: Area,
  },
  computed: {
    ...mapGetters("userInfoModule", ["getUserId"]),
  },
  methods: {
    ...mapActions("userInfoModule", [
      "asyncSetName",
      "asyncsetAddress",
      "asyncsetSex",
      "asyncsetSignature",
    ]),
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      console.log("保存", this.title, this.value);
      // 更改个人信息的保存按钮
      switch (this.title) {
        case "名字":
          this.asyncSetName({ id: this.getUserId, value: this.value });
          break;
        case "性别":
          this.asyncsetSex({ id: this.getUserId, value: this.value });
          break;
        case "地区":
          this.asyncsetAddress({ id: this.getUserId, value: this.value });
          break;
        case "个性签名":
          this.asyncsetSignature({ id: this.getUserId, value: this.value });
          break;
        default:
          break;
      }
      this.$router.go(-1);
    },
    addressConfirm(data) {
      console.log(data);
      this.value = this.editArea(data);
    },
    // 处理省市区域的函数
    editArea(data) {
      if (data[0].name === data[1].name) {
        return data[0].name.slice(0, -1);
      } else if (data[0].name.indexOf("自治区") > 0) {
        if (data[0].name === "内蒙古自治区") {
          return data[0].name.slice(0, 3) + " " + data[1].name.slice(0, -1);
        }
        return data[0].name.slice(0, 2) + " " + data[1].name.slice(0, -1);
      } else if (data[0].name.indexOf("特别行政区") > 0) {
        return data[0].name.slice(0, 2) + " " + data[1].name;
      } else {
        return data[0].name.slice(0, -1) + " " + data[1].name.slice(0, -1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tips {
  padding: 16px;
  color: #c2c2c2;
}
.address .van-cell-group {
  margin: 10px 0;
}
</style>