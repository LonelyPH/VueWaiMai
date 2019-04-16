/*
 * 供actions调用的方法对象
 */

import Vue from "vue";

import {
  RECEIVE_FOOD_LIST,
  RECEIVE_SHOP_LIST,
  RECEIVE_ADDRESS,
  RECEIVE_USER_MSG,
  LOGIN_OUT,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_PINGJIA,
  RECEIVE_SHOP_MSG,
  JIA_COUNT,
  JIAN_COUNT,
  CLEAR_CART
} from "./mutation-types";

export default {
  //*食品分类列表
  [RECEIVE_FOOD_LIST](state, { foodList }) {
    state.foodList = foodList;
  },
  //*商家列表
  [RECEIVE_SHOP_LIST](state, { shopList }) {
    state.shopList = shopList;
  },
  //*定位地址
  [RECEIVE_ADDRESS](state, { address, latitude, longitude }) {
    state.address = address;
    state.latitude = latitude;
    state.longitude = longitude;
  },
  //*记录用户信息
  [RECEIVE_USER_MSG](state, { userMsg }) {
    state.userMsg = userMsg;
  },
  //*用户登出
  [LOGIN_OUT](state) {
    state.userMsg = {};
  },
  //*获取mock数据

  //商家商品
  [RECEIVE_SHOP_GOODS](state, { shopGoods }) {
    state.shopGoods = shopGoods;
  },
  //商家评价
  [RECEIVE_SHOP_PINGJIA](state, { shopPingJia }) {
    state.shopPingJia = shopPingJia;
  },
  //商家信息
  [RECEIVE_SHOP_MSG](state, { shopMsg }) {
    state.shopMsg = shopMsg;
  },
  [JIA_COUNT](state, { food }) {
    if (!food.count) {
      /*
       *food.count = 1; 新增属性没有数据绑定
       *要用Vue.set(模板对象或数组, "要添加的属性名", 属性值)来添加新的属性
       */
      Vue.set(food, "count", 1);
      //*当某个food对象上添加了count属性就将该food对象添加到foodsChoosed数组中
      state.foodsChoosed.push(food);
    } else {
      food.count++;
    }
  },
  [JIAN_COUNT](state, { food }) {
    if (food.count) {
      food.count--;
      //*当购物车的foodsChoosed数组中某个food对象的count为0时将该food对象从数组中删除
      if (food.count === 0) {
        state.foodsChoosed.splice(state.foodsChoosed.indexOf(food), 1);
      }
    }
  },
  //*清空购物车
  [CLEAR_CART](state) {
    //删除food中的count属性
    state.foodsChoosed.forEach(food => food.count = 0);
    //重置数组
    state.foodsChoosed = [];
  }
};
