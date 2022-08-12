<template>
  <div class="compareState">
    <van-circle
      v-model="currentRate"
      :rate="rate"
      :color="gradientColor"
      :stroke-width="60"
      layer-color="#ebedf0"
      :text="text"
      :speed="50"
      size="120px"
    />
  </div>
</template>

<script>
import { Circle } from "vant";
export default {
  name: "CompareState",
  components: {
    [Circle.name]: Circle,
  },
  data() {
    return {
      currentRate: 0,
      rate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      timer: null,
    };
  },
  mounted() {
    let timer = setInterval(() => {
      this.rate += Math.floor(Math.random() * 6 + 20);
      if (this.rate >= 100) {
        clearInterval(timer);
        timer = null;
        this.$emit("nextPart", 2);
      }
    }, 1000);
  },
  computed: {
    text() {
      return "比对进度" + this.currentRate.toFixed(0) + "%";
    },
  },
};
</script>

<style lang="less" scoped>
.compareState {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>