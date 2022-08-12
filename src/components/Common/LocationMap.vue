<template>
  <div class="locationMap">
    <div id="container">
      <img
        :class="{ locationImg: true, animate: isAnimate }"
        src="https://a.amap.com/jsapi_demos/static/resource/img/user.png"
        style="width: 36px; height: 36px"
      />
    </div>
    <div class="info">
      <h2 class="result">
        定位结果:
        <span
          :class="{
            success: isSuccess > 0,
            error: isSuccess < 0,
            basic: isSuccess == 0,
          }"
          >{{ locationResult }}</span
        >
      </h2>
      <h2 class="du">
        定位经纬度: <span>（ {{ position }} ）</span>
      </h2>
      <div class="errMsg" v-if="isSuccess < 0">
        <h2>失败信息:</h2>
        <h4>
          <p>失败原因排查信息: {{ message }}</p>
          <p>浏览器返回信息: {{ originMessage }}</p>
        </h4>
      </div>
      <div class="but">
        <van-button
          @click="saveLocation"
          :disabled="isSuccess <= 0"
          block
          type="primary"
          >保存当前位置</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import { mapMutations } from "vuex";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "LocationMap",
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      map: null,
      isSuccess: 0,
      locationResult: "正在定位中~~",
      position: "0, 0",
      message: "",
      originMessage: "",
      isAnimate: false,
    };
  },
  props: {
    goBack: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods: {
    ...mapMutations(["editLocation"]),
    initMap() {
      AMapLoader.load({
        key: "76d903385b094103c3823257fd89372b", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 17, //初始化地图级别
          });
          // 定位服务配置
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            zoomToAccuracy: true,
            useNative: true,
            showCircle: false,
            showMarker: false,
            zoomToAccuracy: true,
          });
          // 添加定位插件
          this.map.addControl(geolocation);
          geolocation.getCurrentPosition((status, result) => {
            if (status == "complete") {
              this.onComplete(result);
            } else {
              this.onError(result);
            }
          });
          //绑定地图移动与缩放事件
          this.map.on("moveend", this.updateLocation);
          this.map.on("zoomend", this.updateLocation);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //解析定位结果
    onComplete(data) {
      this.locationResult = "定位成功";
      this.isSuccess = 1;
      this.position = data.position;
    },
    //解析定位错误信息
    onError(data) {
      this.locationResult = "定位失败";
      this.isSuccess = -1;
      this.message = data.message;
      this.originMessage = data.originMessage;
    },
    saveLocation() {
      const loc = `[${this.position.lng},${this.position.lat}]`;
      // console.log(JSON.parse(loc));
      this.editLocation(JSON.parse(loc));
      // this.$router.replace("/");
      // 自定义事件
      this.$emit("saveLocation", loc);
      if (this.goBack) {
        this.$router.go(-1);
      }
    },
    updateLocation() {
      // let zoom = this.map.getZoom(); //获取当前地图级别
      let center = this.map.getCenter(); //获取当前地图中心位置
      // console.log("中心位置", center);
      this.position = center;
      // 开启动画
      this.isAnimate = true;
      setTimeout(() => {
        this.isAnimate = false;
      }, 1000);
    },
    destroyed() {
      this.map.destroy();
      this.map = null;
    },
  },
};
</script>

<style lang="less" scoped>
.locationMap {
  #container {
    position: relative;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 400px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .locationImg {
      z-index: 9;
    }
  }
  .info {
    background-color: #fff;
    padding: 10px;
    h2 {
      padding: 10px 0;
    }
    .result {
      .success {
        color: #67c23a;
      }
      .error {
        color: #f56c6c;
      }
      .basic {
        color: #409eff;
      }
    }
    .but {
      margin: 20px 0 15px;
      .van-button {
        width: 200px;
        margin: 0 auto;
      }
    }
  }
  .animate {
    animation: bounce-down 1s linear;
  }
  @keyframes bounce-down {
    0% {
      transform: translate(0px, 0px);
    }

    50% {
      transform: translate(0px, -10px);
    }

    90% {
      transform: translate(0px, 3px);
    }

    100% {
      transform: translate(0px, 0px);
    }
  }
}
</style>