<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <NavHeader title="独行Pet之家"></NavHeader>
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      show-action
      disabled
      label="宠物"
      placeholder="请输入搜索关键词"
      shape="round"
      @click="toSearch"
    >
      <template #action>
        <van-icon
          name="location-o"
          class="location"
          size="25"
          @click="selectAddress"
        />
      </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="item in images"
        :key="item.petId"
        @click="toPetDetails(item.petId)"
      >
        <img v-lazy="item.imgs" />
        <div class="info">
          <p>宠物名: {{ item.petName }}</p>
          <p>上次投喂时间: {{ item.lastFeedTime | formatDate }}</p>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 发布招领 和 寻找爱宠 -->
    <Options></Options>
    <!-- 附件的流浪 Pet -->
    <NearlyPet></NearlyPet>
    <!-- 底部导航栏 -->
    <NavBottom></NavBottom>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Swipe, SwipeItem, Lazyload, Icon, Toast } from "vant";
import NavHeader from "@/components/NavHeader.vue";
import NavBottom from "@/components/NavBottom.vue";
import Options from "./children/Options.vue";
import NearlyPet from "./children/NearlyPet.vue";
import { getPetBanner } from "../../api";

Vue.use(Lazyload);
export default {
  name: "Home",
  components: {
    NavHeader,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    NavBottom,
    Options,
    NearlyPet,
  },
  filters: {
    formatDate(value) {
      return value?.substr(0, 10);
    },
  },
  data() {
    return {
      searchValue: "",
      images: [],
    };
  },
  mounted() {
    getPetBanner().then((res) => {
      console.log("轮播图", res);
      this.images = res;
    });
  },
  methods: {
    toSearch() {
      console.log("去搜索界面");
      this.$router.push({ name: "Search" });
    },
    selectAddress() {
      // 选择当前定位位置
      console.log("定位");
      this.$router.push({ name: "UserLocation" });
    },
    toPetDetails(id) {
      this.$router.push({
        name: "PetDetails",
        params: { id },
      });
    },
  },
};
</script>
<style lang="less">
.home {
  .van-nav-bar {
    z-index: 2;
  }
  .van-search {
    position: sticky;
    top: 46px;
    z-index: 666;
  }
  .van-tabs__wrap {
    position: sticky;
    top: 100px;
    z-index: 666;
  }
  .van-swipe-item {
    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      padding: 5px;
      // background-color: #eee;
      pointer-events: none;
    }
    .info {
      position: absolute;
      bottom: 9px;
      right: 28px;
      width: 333px;
      color: #fff;
      p {
        padding: 4px;
      }
    }
  }
  .location {
    top: 3px;
  }
}
</style>
