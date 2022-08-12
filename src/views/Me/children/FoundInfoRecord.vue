<template>
  <div class="foundInfoRecord">
    <nav-bar-back title="发布的招领信息记录"></nav-bar-back>
    <found-info-record-item
      v-for="item in foundInfoRecordList"
      :key="item.petId"
      :foundInfoRecordListItem="item"
    ></found-info-record-item>
    <van-empty v-if="foundInfoRecordList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import FoundInfoRecordItem from "../../../components/Me/Record/FoundInfoRecordItem.vue";
import NavBarBack from "../../../components/NavBarBack.vue";
import { Empty } from "vant";
import { getUserPublishRecord } from "../../../api";
import { mapState } from "vuex";
export default {
  name: "FoundInfoRecord",
  components: { NavBarBack, FoundInfoRecordItem, [Empty.name]: Empty },
  data() {
    return {
      foundInfoRecordList: [],
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  mounted() {
    getUserPublishRecord(this.loginInfo.userId).then((res) => {
      console.log(res);
      this.foundInfoRecordList = res;
    });
  },
};
</script>

<style lang="less" scoped>
</style>