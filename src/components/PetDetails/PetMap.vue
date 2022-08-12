<template>
  <div class="petMap">
    <h2>用户投喂宠物的地点记录:</h2>
    <MapContainer></MapContainer>
  </div>
</template>

<script>
import MapContainer from "../Common/MapContainer.vue";
export default {
  name: "PetMap",
  components: {
    MapContainer,
  },
};
</script>

<style lang="less" scoped>
.petMap {
  padding: 10px;
  h2 {
    padding: 10px;
    padding-left: 5px;
  }
}
</style>