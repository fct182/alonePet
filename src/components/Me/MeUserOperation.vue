<template>
  <div class="userOperation">
    <van-cell
      icon="send-gift-o"
      class="cell1"
      title="投喂记录"
      is-link
      :to="`/feedRecord/${userInfo.userId}`"
    />
    <van-cell
      icon="good-job-o"
      class="cell1"
      title="救助/领养记录"
      is-link
      :to="`/rescueRecord/${userInfo.userId}`"
    />
    <van-cell
      icon="records"
      class="cell1"
      title="发布的招领信息记录"
      is-link
      :to="`/foundInfoRecord/${userInfo.userId}`"
    />
    <van-cell icon="setting-o" title="设置" is-link to="/userSettings" />
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
import { mapState } from "vuex";
export default {
  name: "MeUserOperation",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  computed: {
    ...mapState("userInfoModule", ["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.userOperation {
  .cell1 {
    margin-bottom: 10px;
  }
}
</style>