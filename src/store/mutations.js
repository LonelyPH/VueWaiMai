/*
 * 供actions调用的方法对象
 */
import {
  RECEIVE_FOOD_LIST,
  RECEIVE_SHOP_LIST,
  RECEIVE_ADDRESS,
  RECEIVE_USER_MSG
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
  }
};
