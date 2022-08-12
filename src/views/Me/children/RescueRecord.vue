<template>
  <div class="rescueRecord">
    <nav-bar-back title="救助/领养记录"></nav-bar-back>
    <rescue-record-item
      v-for="item in rescueRecordList"
      :key="item.petId"
      :rescueRecordListItem="item"
    ></rescue-record-item>
    <van-empty v-if="rescueRecordList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import RescueRecordItem from "../../../components/Me/Record/RescueRecordItem.vue";
import NavBarBack from "../../../components/NavBarBack.vue";
import { Empty } from "vant";
import { mapState } from "vuex";
import { getUserRescueRecord } from "../../../api";
export default {
  name: "RescueRecord",
  components: { NavBarBack, RescueRecordItem, [Empty.name]: Empty },
  data() {
    return {
      rescueRecordList: [
        {
          id: "abc",
          trait: "头是黄白间的狗狗",
          rescueType: "送医诊疗(救助)",
          createTime: "2022/01/24",
          address: "四川成都",
          img: "https://img0.baidu.com/it/u=4215415328,2443301174&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=263",
        },
        {
          id: "werr",
          trait: "柴犬",
          rescueType: "领养",
          createTime: "2022/03/12",
          address: "四川自贡",
          img: "https://img2.baidu.com/it/u=2047694878,2534190498&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        },
      ],
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  mounted() {
    getUserRescueRecord(this.loginInfo.userId).then((res) => {
      console.log(res);
      this.rescueRecordList = res;
    });
  },
};
</script>

<style lang="less" scoped>
</style>