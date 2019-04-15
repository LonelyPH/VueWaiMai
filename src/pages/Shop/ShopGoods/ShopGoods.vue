<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          v-for="(goods, index) in shopGoods"
          :key="index"
          @click="currentMenuItem(index)"
          :class="{current: currentIndex === index}"
        >
          <span class="text bottom-border-1px">
            <img class="icon" v-if="goods.icon" :src="goods.icon">
            <span v-text="goods.name"></span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="toLis">
        <li class="food-list-hook" v-for="(goods, index) in shopGoods" :key="index">
          <h1 class="title" v-text="goods.name"></h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="(food, index) in goods.foods"
              :key="index"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name" v-text="food.name"></h2>
                <p class="desc" v-text="food.description"></p>
                <div class="extra">
                  <span class="count" v-text="'月售' + food.sellCount + '份'"></span>
                  <span v-text="'好评率' + food.rating + '%'"></span>
                </div>
                <div class="price">
                  <!-- 现价 -->
                  <span class="now" v-text="'￥' + food.price"></span>
                  <!-- 原价 -->
                  <span class="old" v-if="food.oldPrice" v-text="'￥' + food.oldPrice"></span>
                </div>

                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";

import CartControl from "../../../components/CartControl/CartControl";
export default {
  data() {
    return {
      scrollY: 0,
      tops: []
    };
  },
  components: {
    CartControl
  },
  mounted() {
    //*使用回调函数代替watch的数据监视
    this.$store.dispatch("getGoods", () => {
      this.$nextTick(() => {
        //创建better-scroll的实例对象
        new BScroll(".menu-wrapper", {
          click: true
        });
        //*初始化滚动
        this._initRigthScroll();
        //*初始化tops
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["shopGoods"]),
    currentIndex() {
      const { scrollY, tops } = this;
      //*根据scrollY和tops查找scrollY对应的分类li的下标
      const index = tops.findIndex((top, index) => {
        //*判断scrollY与哪个分类li的top匹配
        return scrollY >= top && scrollY < tops[index + 1];
      });
      return index;
    }
  },
  methods: {
    //*初始化滚动获取scrollY
    _initRigthScroll() {
      //创建better-scroll的实例对象并赋值给rigthScroll
      this.rigthScroll = new BScroll(".foods-wrapper", {
        probeType: 2,
        click: true
      });
      //绑定scroll事件
      this.rigthScroll.on("scroll", ({ x, y }) => {
        // console.log(y);
        this.scrollY = Math.abs(y);
      });
      this.rigthScroll.on("scrollEnd", ({ x, y }) => {
        // console.log(y);
        this.scrollY = Math.abs(y);
      });
    },
    //*初始化tops
    _initTops() {
      const lis = this.$refs.toLis.children;
      // console.log(lis);
      const tops = [];
      //*第一个分类li的top
      let top = 0;
      tops.push(top);
      Array.prototype.slice.call(lis).forEach(li => {
        //*获取每个分类li的top的累加
        top += li.clientHeight;
        // console.log(top)
        //*收集每次累加后的top值
        tops.push(top);
      });
      this.tops = tops;
      // console.log(tops);
    },
    currentMenuItem(index) {
      // console.log(index);
      //滑动到指定的位置,y值由tops中下标index对应的值确定
      const y = this.tops[index];
      this.scrollY = this.tops[index];
      //*使用scrollTo方法
      this.rigthScroll.scrollTo(0, -y, 300);
    },
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>

