<template>
  <div class="feedRecord">
    <nav-bar-back title="投喂记录"></nav-bar-back>
    <feed-record-item
      v-for="item in feedRecordList"
      :feedRecordListItem="item"
      :key="item.petId"
    ></feed-record-item>
    <van-empty v-if="feedRecordList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
import FeedRecordItem from "../../../components/Me/Record/FeedRecordItem.vue";
import { Empty } from "vant";
import NavBarBack from "../../../components/NavBarBack.vue";
import { getUserFeedingRecord } from "../../../api";
import { mapState } from "vuex";
export default {
  name: "FeedRecord",
  components: { NavBarBack, FeedRecordItem, [Empty.name]: Empty },
  data() {
    return {
      feedRecordList: [],
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  mounted() {
    getUserFeedingRecord(this.loginInfo.userId).then((res) => {
      console.log(res);
      this.feedRecordList = res;
    });
  },
};
</script>

<style lang="less" scoped>
</style>