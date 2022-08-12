<template>
  <div class="login">
    <div class="content" ref="content">
      <!-- 登录表单 -->
      <van-form v-if="isLogin">
        <van-field
          v-model="account"
          name="account"
          label="账号"
          autocomplete="off"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          @focus="closeEye"
          @blur="openEye"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="loginButton">
          <van-button
            round
            hairline
            plain
            type="info"
            native-type="button"
            @click="isLogin = false"
            >注册</van-button
          >
          <van-button
            round
            hairline
            type="info"
            @click="onSubmit"
            native-type="button"
            >登录</van-button
          >
        </div>
      </van-form>
      <!-- 注册表单 -->
      <div class="register" v-else>
        <van-button
          class="back"
          size="small"
          round
          hairline
          icon="arrow-left"
          type="primary"
          @click="isLogin = true"
          >返回登录</van-button
        >
        <van-form @submit="onRegister">
          <van-field
            v-model="account"
            name="account"
            label="手机号"
            placeholder="请输入手机号"
            autocomplete="off"
            type="tel"
            :rules="[
              {
                required: true,
                validator: asyncValidator,
                message: accountFlag,
              },
            ]"
          />
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="为自己取一个昵称"
            autocomplete="off"
            :rules="[{ required: true }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true }]"
            @focus="closeEye"
            @blur="openEye"
          />
          <van-field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请输入确认密码"
            @focus="closeEye"
            @blur="openEye"
            :rules="[
              {
                required: true,
                validator: (value, rule) => {
                  return confirmPassword === password;
                },
                message: '两次输入的密码不一致',
              },
            ]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from "vant";
import { mapMutations, mapActions } from "vuex";
import { userRegister, userLogin, verifyUserAccount } from "../../api/index.js";
export default {
  name: "Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      account: "",
      username: "",
      password: "",
      confirmPassword: "",
      isLogin: true,
    };
  },
  methods: {
    ...mapActions(["asyncGetLoginInfo"]),
    ...mapActions("userInfoModule", ["asyncSetUserInfo"]),
    accountFlag(val) {
      if (!/1\d{10}/.test(val)) {
        return "手机号格式不正确";
      }
      return "该手机号已被注册";
    },
    asyncValidator(val) {
      let flag1 = /1\d{10}/.test(val);
      if (!flag1) {
        // 不满足 11位数字
        return false;
      } else {
        return new Promise((resolve) => {
          Toast.loading("验证中...");
          verifyUserAccount(val).then((res) => {
            // console.log(res);
            Toast.clear();
            if (res.status === 400) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        });
      }
    },
    onSubmit() {
      // 登录的 http请求
      userLogin({
        account: this.account,
        password: this.password,
      }).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.$toast.success({
            message: "登录成功",
            duration: 1200,
          });
          // 持久化存储

          // 1.更新 Store 的状态
          this.asyncGetLoginInfo({
            isLogin: true,
            name: res.username,
            token: res.token,
            userId: res.userId,
          });
          // 2. 更新 Store 中的用户信息
          this.asyncSetUserInfo(res.userId);
          // 3. 跳转路由
          let toRouter = decodeURIComponent(this.$route.params.path || "/");
          this.$router.replace({ path: toRouter });
        } else {
          this.$toast.fail({
            message: res.message,
          });
        }
      });
    },
    onRegister(values) {
      console.log("注册提交", values);
      // 注册 HTTP请求
      userRegister({
        account: this.account,
        username: this.username,
        password: this.password,
      }).then((res) => {
        if (res.status === 200) {
          this.$toast.success({
            message: res.message,
            position: "top",
            duration: 1000,
          });
          // 返回登录界面
          this.isLogin = true;
        } else {
          this.$toast.fail({
            message: res.message,
            position: "top",
          });
        }
      });
    },
    closeEye() {
      this.$refs.content.style = `background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_close.0efad8c4.png),
      url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/33_close.eea03c39.png);`;
    },
    openEye() {
      this.$refs.content.style = "";
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 14px;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    width: 375px;
    border-radius: 12px;
    box-shadow: 0 0 6px rgb(0 0 0 / 10%);
    padding: 52px 10px 80px 10px;
    box-sizing: border-box;
    background-color: #fff;
    background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_open.72c00877.png),
      url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/33_open.43a09438.png);
    background-position: 0 100%, 100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 18%;
    position: relative;
    flex-direction: column;
    .loginButton {
      margin: 16px;
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
      }
    }
  }
  .register {
    .back {
      top: 8px;
      left: 10px;
      position: absolute;
    }
  }
}
</style>