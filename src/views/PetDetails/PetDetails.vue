<template>
  <div class="petDetails">
    <nav-bar-back :title="title"></nav-bar-back>
    <!-- <h1>宠物ID: {{ this.$route.params.id }}</h1> -->
    <van-swipe @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ images.length }}
        </div>
      </template>
    </van-swipe>
    <div class="wrap">
      <PetBasicInfo :data="data"></PetBasicInfo>
    </div>
    <div class="wrap">
      <PetMap></PetMap>
    </div>
    <PetDetailBottom :info="info" :date="data.lastFeedTime"></PetDetailBottom>
  </div>
</template>

<script>
import NavBarBack from "../../components/NavBarBack.vue";
import { Swipe, SwipeItem } from "vant";
import PetBasicInfo from "../../components/PetDetails/PetBasicInfo.vue";
import PetMap from "../../components/PetDetails/PetMap.vue";
import PetDetailBottom from "../../components/PetDetails/PetDetailBottom.vue";
import { getPetInfoById } from "../../api";
import { mapState } from "vuex";
export default {
  name: "PetDetails",
  components: {
    NavBarBack,
    PetBasicInfo,
    PetMap,
    PetDetailBottom,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      title: "宠物详情",
      current: 0,
      images: [],
      data: {},
      info: {},
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
  },
  mounted() {
    // 请求宠物狗的详细信息
    getPetInfoById(this.$route.params.id).then((res) => {
      console.log(res);
      this.images = res.imgs;
      this.data = res;
      this.info = {
        petId: res.petId,
        userId: this.loginInfo.userId,
        chatImg: res.img,
        chatTitle: res.petName + "的聊天室",
      };
      // 滚动条滚到最顶端
      window.scrollTo(0, 0);
    });
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="less" scoped>
.petDetails {
  .van-swipe {
    margin: 10px 0;
    .van-swipe-item {
      box-sizing: border-box;
      img {
        width: 100%;
        height: 240px;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .wrap {
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>