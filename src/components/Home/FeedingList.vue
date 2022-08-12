<template>
  <div class="feedingList">
    <FeedingItem
      v-for="item in list"
      :key="item.petId"
      :data="item"
      :css="css"
    ></FeedingItem>
  </div>
</template>

<script>
import FeedingItem from "./FeedingItem.vue";
export default {
  name: "FeedingList",
  components: {
    FeedingItem,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    css: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.feedingList {
  padding: 6px 0 0;
}
</style>