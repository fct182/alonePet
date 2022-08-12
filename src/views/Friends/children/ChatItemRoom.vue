<template>
  <div class="room">
    <van-nav-bar
      fixed
      placeholder
      :title="$route.params.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="chatContent">
      <div class="item" v-for="(item, index) in messageList" :key="index">
        <template v-if="item.petId == petId">
          <template v-if="item.type == 1">
            <p class="joinTips">{{ item.userName }}加入聊天室</p>
          </template>
          <template v-else>
            <!-- 我的发言 -->
            <div class="myMessage" v-if="item.isMine">
              <van-image
                round
                width="40"
                height="40"
                fit="cover"
                :src="userInfo.headshots"
              />
              <div class="message">{{ item.msg }}</div>
            </div>
            <!-- 他人发言 -->
            <div class="otherMessage" v-else>
              <van-image
                round
                width="40"
                height="40"
                fit="cover"
                :src="item.headshots"
              />
              <div class="message">{{ item.msg }}</div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="input">
      <van-search
        v-model="value"
        show-action
        left-icon="chat-o"
        placeholder="请输入发送的消息"
        @search="sendMsg"
      >
        <template #action>
          <div @click="sendMsg">发送</div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
import { NavBar, Search, Image as VanImage } from "vant";
import { mapState } from "vuex";
export default {
  name: "ChatItemRoom",
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [VanImage.name]: VanImage,
  },
  data() {
    return {
      value: "",
      ws: null,
      petId: "",
      messageList: [
        // { type: 1 },
        // { type: 2, isMine: true, msg: "您好！" },
        // {
        //   type: 2,
        //   isMine: false,
        //   msg: "除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。",
        // },
      ],
    };
  },
  computed: {
    ...mapState(["loginInfo"]),
    ...mapState("userInfoModule", ["userInfo"]),
  },
  mounted() {
    this.petId = this.$route.params.id;
    this.connectWebsocket();
  },
  beforeDestroy() {
    // 关闭websocket连接
    this.ws.close();
  },
  methods: {
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    },
    // 点击发送消息
    sendMsg() {
      console.log(this.value);
      this.sendMessage(0, this.value);
    },
    sendMessage(type, msg) {
      // type 为 1则是进入聊天室，其他则为发送消息
      this.ws.send(
        JSON.stringify({
          userId: this.loginInfo.userId,
          userName: this.loginInfo.name,
          type: type,
          msg: msg,
          petId: this.petId,
          headshots: this.userInfo.headshots,
        })
      );
      this.value = "";
    },
    // 建立websocket连接
    connectWebsocket() {
      if (window.WebSocket) {
        this.ws = new WebSocket("ws://localhost:8001");
        let ws = this.ws;
        ws.onopen = (e) => {
          console.log("WebSocket连接服务器成功");
          // 向服务器发送消息
          this.sendMessage(1);
        };
        ws.onclose = function (e) {
          console.log("服务器关闭");
        };
        ws.onerror = function () {
          console.log("连接出错");
        };
        // 接收服务器的消息
        ws.onmessage = (e) => {
          let message = JSON.parse(e.data);
          message.isMine = message.userId == this.loginInfo.userId;
          this.messageList.push(message);
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.room {
  position: relative;
  .chatContent {
    padding: 15px 10px;
    height: 80vh;
    overflow: auto;
    background-color: #e6f7ff;
    .item {
      .joinTips {
        margin: 10px;
        color: #909399;
        text-align: center;
      }
      .myMessage {
        margin: 10px 0;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .message {
          color: #fff;
          margin-right: 10px;
          padding: 8px;
          max-width: 200px;
          border-radius: 8px;
          background-color: #69c0ff;
        }
      }
      .otherMessage {
        margin: 10px 0;
        display: flex;
        align-items: center;
        .message {
          color: #000;
          margin-left: 10px;
          padding: 8px;
          max-width: 200px;
          border-radius: 8px;
          background-color: #d9f7be;
        }
      }
    }
  }
  .input {
    .van-search {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    &::after {
      content: "";
      display: block;
      height: 54px;
    }
  }
}
</style>