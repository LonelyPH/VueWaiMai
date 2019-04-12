/*
 *actions 方法对象
 */

import {
  RECEIVE_FOOD_LIST,
  RECEIVE_ADDRESS,
  RECEIVE_SHOP_LIST
} from "./mutation-types";

import { getFoodList, geoFindMe, getShopList } from "../api/index";
export default {
  //*获取食品列表
  async receiveFoodList({ commit }) {
    //*向后台请求数据
    const result = await getFoodList();
    if (result.code === 0) {
      const foodList = result.data;
      commit(RECEIVE_FOOD_LIST, { foodList });
    }
  },
  //*定位地址
  receiveAddress({ commit }) {
    // //*定位当前地址
    geoFindMe()
      .then(response => {
        const address = response.address;
        const latitude = response.point.lat;
        const longitude = response.point.lng;
        commit(RECEIVE_ADDRESS, { address, latitude, longitude });
      })
      .catch(error => {
        const address = error;
        const latitude = null;
        const longitude = null;
        commit(RECEIVE_ADDRESS, { address, latitude, longitude });
      });
  },
  //*获取附近商铺
  async receiveShoplist({ commit, state }) {
    const latitude = state.latitude;
    const longitude = state.longitude;
    const result = await getShopList({ latitude, longitude });
    if (result.code === 0) {
      const shopList = result.data
      commit(RECEIVE_SHOP_LIST, { shopList });
    }
  }
};
