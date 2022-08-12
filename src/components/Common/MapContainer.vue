<template>
  <div id="container"></div>
</template>

<script>
window._AMapSecurityConfig = {
  securityJsCode: "5aa9fb2bf29cfaf4ee9f2c0e082a43ed",
};
import AMapLoader from "@amap/amap-jsapi-loader";
import { getPetAddress } from "../../api";
export default {
  name: "MapContainer",
  data() {
    return {
      map: null,
      // path: [
      //   [103.95399, 30.77817],
      //   [103.95751, 30.78025],
      //   [103.96082, 30.7801],
      //   [103.96067, 30.77817],
      // ],
      path: [],
      feedingNum: 0,
    };
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    getPetAddress(this.$route.params.id).then((res) => {
      // console.log("位置", res);
      this.path = JSON.parse(res.address);
      this.feedingNum = res.feedingNum;
      // 初始化地图
      this.initMap();
    });
  },
  updated() {
    console.log("updated", this.path);
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "76d903385b094103c3823257fd89372b", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        plugins: [
          "AMap.ToolBar",
          "AMap.Polyline",
          "AMap.Circle",
          "AMap.Marker",
        ], // 需要使用的的插件列表
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 17, //初始化地图级别
            // center: [103.954, 30.77682], //初始化地图中心点位置
            rotateEnable: true,
            pitchEnable: true,
            pitch: 50,
            rotation: -15,
          });
          // 缩放工具
          this.map.addControl(new AMap.ToolBar());
          // 折线
          this.map.add([
            new AMap.Polyline({
              path: this.path,
              isOutline: true,
              outlineColor: "#ffeeff",
              borderWeight: 1,
              strokeColor: "#3366FF",
              strokeOpacity: 1,
              strokeWeight: 6,
              // 折线样式还支持 'dashed'
              strokeStyle: "solid",
              // strokeStyle是dashed时有效
              strokeDasharray: [10, 5],
              lineJoin: "round",
              lineCap: "round",
              zIndex: 50,
            }),
          ]);
          // 圆形图形
          for (const item of this.path) {
            this.map.add(
              new AMap.Circle({
                center: item,
                radius: 200, //半径
                borderWeight: 3,
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 2,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                strokeDasharray: [10, 10],
                // 线样式还支持 'dashed'
                fillColor: "#ff7a45",
                zIndex: 50,
              })
            );
          }
          let content =
            this.feedingNum > 0
              ? "<div class='info'>最后一次投喂地点</div>"
              : "<div class='info'>第一次被发现的地点</div>";
          this.map.add(
            new AMap.Marker({
              // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
              position: this.path[this.path.length - 1],
              title: "上一次投喂时的位置",
              // offset: [-13, -30],
              label: {
                content: content,
                offset: [3, 0],
              },
            })
          );
          this.map.setFitView();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  beforeDestroy() {
    // console.log("地图beforeDestroy");
    this.map.destroy();
    this.map = null;
  },
};
</script>

<style lang="less" scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 300px;
  /deep/ .amap-icon {
    width: 25px;
    height: 34px;
    img {
      width: 25px;
      height: 34px;
    }
  }
  /deep/ .amap-marker-label {
    border: 0;
    background-color: transparent;
  }
  /deep/ .info {
    padding: 5px;
    border-radius: 0.25rem;
    background-color: white;
    width: auto;
    border-width: 0px;
    box-shadow: rgb(114, 124, 245, 50%) 0px 2px 6px 0px;
  }
}
</style>