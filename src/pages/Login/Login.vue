<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Vue外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="updataCaptcha">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <!-- 短信验证登录 -->
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                :disabled="!phonePass"
                class="get_verification"
                :class="{phonePass_class: phonePass}"
                @click.prevent="sendCode"
                v-text="time ? `已发送(${time}s)` : '获取验证码'"
              ></button>
            </section>
            <section class="login_verification">
              <input type="number" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 账号密码登录 -->
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input
                  :type="typeChange ? 'password' : 'text'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                >
                <div
                  class="switch_button"
                  @click="typeChange = !typeChange"
                  :class="{on: !typeChange, off: typeChange}"
                >
                  <div class="switch_circle" :class="{right: !typeChange}"></div>
                  <span class="switch_text" v-text="typeChange ? '...' : 'abc'"></span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img
                  class="get_verification"
                  src="http://localhost:4001/captcha"
                  alt="captcha"
                  @click="changeCaptcha"
                  ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <LoginAlert :alertText="alertText" v-if="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import LoginAlert from "../../components/LoginAlert/LoginAlert";
import {
  sendYanZhengMa,
  duanXinLogin,
  passwordLogin
} from "../../api/index.js";
export default {
  data() {
    return {
      loginWay: true, //登录方式标识
      time: 0, //倒计时
      typeChange: true, //密码显示隐藏标识

      //*短信登录验证
      phone: "", //手机号
      code: "", //短信验证码

      //*账号密码登录验证
      name: "", //账号
      pwd: "", //密码
      captcha: "", //图片验证码
      alertText: "", //提示文本
      alertShow: false //提示框显示隐藏标识
    };
  },
  components: {
    LoginAlert
  },
  computed: {
    phonePass() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    //*每次切换密码登录时更新一次验证码
    updataCaptcha() {
      this.loginWay = false;
      this.changeCaptcha();
    },
    //*异步获取短信验证码
    async sendCode() {
      //*显示倒计时
      if (!this.time) {
        this.time = 60;
        this.timeId = setInterval(() => {
          this.time -= 1;
          if (this.time <= 0) {
            clearInterval(this.timeId);
          }
        }, 1000);
      }
      //*发送请求，向手机号发送验证码
      const result = await sendYanZhengMa(this.phone);
      if (result.code === 0) {
        this.showAlert("验证码已发送，请注意查收！");
      } else if (result.code === 1) {
        this.showAlert(result.msg);
        if (this.time) {
          //停止倒计时
          clearInterval(this.timeId);
          this.time = 0;
        }
      }
    },
    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },
    //*异步登录
    async login() {
      // const { phonePass } = this;
      let result;
      //*前台验证
      if (this.loginWay) {
        //短信登录
        if (!this.phonePass) {
          //手机号不正确
          this.showAlert("手机号不正确");
          return;
        } else if (!/^\d{6}$/.test(this.code)) {
          //短信验证码不能为空
          this.showAlert("请输入6位短信验证码");
          return;
        }
        //*发送ajax请求短信验证登录
        result = await duanXinLogin({ phone: this.phone, code: this.code });
      } else {
        //账号密码登录
        if (!/^[a-zA-z]\w{3,15}$/.test(this.name)) {
          //请输入4-16位的合法账号
          this.showAlert("请输入4-16位的合法账号");
          this.changeCaptcha();
          return;
        } else if (!this.pwd) {
          //密码不能为空
          this.showAlert("密码不能为空");
          this.changeCaptcha();
          return;
        } else if (!this.captcha) {
          //验证码不能为空
          this.showAlert("验证码不能为空");
          this.changeCaptcha();
          return;
        }
        //*发送ajax请求账号密码登录
        result = await passwordLogin({
          name: this.name,
          pwd: this.pwd,
          captcha: this.captcha
        });
      }
      if (result.code === 0) {
        // 获取到用户信息
        const user = result.data;
        //触发actions 记录用户信息
        this.$store.dispatch("getUserMsg", user);
        // 跳转到个人中心
        this.$router.replace("/profile");
      } else {
        const msg = result.msg;
        //显示错误提示
        this.showAlert(msg);
        //更新图片验证码
        this.changeCaptcha();
      }
    },
    // 关闭提示框并清空输入
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
      if (this.loginWay) {
        //清空输入
        this.phone = "";
        this.code = "";
      } else {
        this.name = "";
        this.pwd = "";
        this.captcha = "";
      }
    },
    //*更新图片验证码
    changeCaptcha() {
      this.$refs.captcha.src = `http://localhost:4001/captcha?time=${Date.now()}`;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              height: 36px;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.phonePass_class {
                border-radius: 10px;
                background-color: #4cd96f;
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
