<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="showCartList">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount" v-text="totalCount"></div>
          </div>
          <div class="price" v-text="'￥' + totalPrice"></div>
          <div class="desc" v-text="'另需配送费￥' + shopMsg.deliveryPrice + '元'"></div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" v-text="payText"></div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-if="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in foodsChoosed" :key="index">
                <span class="name" v-text="food.name"></span>
                <div class="price">
                  <span v-text="'￥' + food.price"></span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- 添加移除按钮 -->
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-if="listShow" @click="showCartList"></div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CartControl from "../CartControl/CartControl";
import BScroll from "better-scroll";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(["foodsChoosed", "shopMsg"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payText() { //右下角的结算文本的计算属性
      if (this.totalPrice === 0) {
        return `￥${this.shopMsg.minPrice}起送`;
      } else if (this.totalPrice < this.shopMsg.minPrice) {
        return `还差￥${this.shopMsg.minPrice - this.totalPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() { //满足起送价后结算按钮的高亮显示 计算属性
      return this.totalPrice >= this.shopMsg.minPrice ? "enough" : "not-enough";
    },
    listShow() {
      //计算属性 当totalCount不等于0时才发挥isShow的作用，否则直接返回false
      if (this.totalCount === 0) {
        this.isShow = false;
        return false;
      } else {
        //*列表显示时为其建立滑动
        if (this.isShow) {
          this.$nextTick(() => {
            //*创建单例滑动对象
            if (!this.scroll) {
              this.scroll = new BScroll(".list-content", {
                click: true
              });
            } else {
              this.scroll.refresh(); //*为动态添加的列表更新滚动
            }
          });
        }
        return this.isShow;
      }
    }
  },
  methods: {
    showCartList() {
      if (this.totalCount > 0) {
        //当totalCount大于0是才去改变isShow的值
        this.isShow = !this.isShow;
      }
    },
    clearCart() { //*清空购物车
      MessageBox.confirm("是否清空购物车？").then(
        action => {
          this.$store.dispatch("clearCart");
          Toast("购物车已清空");
        },
        () => {}
      );
    }
  },
  components: {
    CartControl
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%); // 向上移动100%以显示列表

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0); // 回到原始位置，隐藏
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
