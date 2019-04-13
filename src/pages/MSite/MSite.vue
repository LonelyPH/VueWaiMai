<template>
  <!--首页外卖-->
  <section class="msite">
    <!-- //*公共header组件 -->
    <HeaderTop :title="address">
      <router-link to="/search" class="header_search" slot="header-search-left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>

      <span class="header_login" slot="header-login-right">
        <!-- 未登录时的显示状态 -->
        <router-link
          :to="userMsg._id ? '/userMsg' : '/login'"
          class="header_login_text"
          v-if="!userMsg._id"
        >登录|注册</router-link>
        <!-- 已登录的显示状态 -->
        <router-link to="'/userMsg'" class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </router-link>
      </span>
    </HeaderTop>
    <!--//*首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodList.length > 0">
        <div class="swiper-wrapper">
          <!-- //*轮播列表 -->
          <div class="swiper-slide">
            <a
              :href="food.link"
              class="link_to_food"
              v-for="(food, index) in foodList"
              :key="index"
            >
              <div class="food_container">
                <img :src="imgBaseUrl + food.image_url">
              </div>
              <span v-text="food.title"></span>
            </a>
          </div>
          <div class="swiper-slide">
            <a
              :href="food.link"
              class="link_to_food"
              v-for="(food, index) in foodList"
              :key="index"
            >
              <div class="food_container">
                <img :src="imgBaseUrl + food.image_url">
              </div>
              <span v-text="food.title"></span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 资源加载中的过渡 -->
      <div v-else>
        <img src="./images/msite_back.svg" alt="back">
      </div>
    </nav>
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <!--//*附近商家 组件-->
      <ShopList/>
    </div>
  </section>
</template>

<script>
//*引入vuex映射函数
import { mapState, mapActions } from "vuex";

//* 引入Swiper相关库
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

//* 引入公共组件HeaderTop
import HeaderTop from "../../components/HeaderTop/HeaderTop";

//*引入子组件
import ShopList from "../../components/ShopList/ShopList";

export default {
  data() {
    return {
      imgBaseUrl: "https://fuss10.elemecdn.com"
    };
  },
  mounted() {
    //*请求后台的FoodList数据
    this.receiveFoodList();
    this.receiveAddress();
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(["foodList", "address", "userMsg"])
  },
  methods: {
    ...mapActions(["receiveFoodList", "receiveAddress"])
  },
  watch: {
    //*监视foodList数据的改变，
    foodList(value) {
      this.$nextTick(() => {
        //*解决轮播BUG 在异步更新界面引起的轮播空白。可以使用定时，但$nextTick更准确
        //* 初始化Swiper
        var mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal", // 垂直切换选项
          loop: true, // 循环模式选项
          //自动切换
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
