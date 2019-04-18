<template>
  <!--搜索-->
  <div>
    <section class="search">
      <!-- //*公共header组件 -->
      <HeaderTop title="搜索"/>

      <form class="search_form" @submit.prevent="search">
        <input
          type="search"
          name="search"
          placeholder="请输入商家或美食名称"
          class="search_input"
          v-model="keyword"
        >
        <input type="submit" name="submit" class="search_submit">
      </form>
      <section class="list" v-if="!isSearch">
        <ul class="list_container">
          <router-link
            :to="{path: '/shop', query:{id: shop.id}}"
            tag="li"
            class="list_li"
            v-for="shop in searchedShops"
            :key="shop.id"
          >
            <section class="item_left">
              <img :src="imgBaseUrl + shop.image_path" class="restaurant_img">
            </section>
            <section class="item_right">
              <div class="item_right_text">
                <p>
                  <span v-text="shop.name"></span>
                </p>
                <p>月售{{shop.recent_order_num}}单</p>
                <p>{{shop.float_minimum_order_amount}}元起送/距离{{shop.distance}}公里</p>
              </div>
            </section>
          </router-link>
        </ul>
      </section>
      <div v-text="'搜索不到任何结果！'" v-else></div>
    </section>
  </div>
</template>

<script>
//* 引入公共组件HeaderTop
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "",
      imgBaseUrl: "http://cangdu.org:8001/img/",
      isSearch: false
    };
  },
  components: {
    HeaderTop
  },
  methods: {
    search() {
      const keyword = this.keyword.trim();
      if (keyword) {
        this.$store.dispatch("search", keyword);
        this.keyword = "";
      }
    }
  },
  computed: {
    ...mapState(["searchedShops"])
  },
  watch: {
    searchedShops(value) {
      if (!value.length) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.search {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }

  .list {
    .list_container {
      background-color: #fff;

      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid $bc;

        .item_left {
          margin-right: 10px;

          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }

        .item_right {
          font-size: 12px;
          flex: 1;

          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .search_none {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>
</style>
