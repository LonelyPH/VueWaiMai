/*
 *actions 方法对象
 */

import {
  RECEIVE_FOOD_LIST,
  RECEIVE_ADDRESS,
  RECEIVE_SHOP_LIST,
  RECEIVE_USER_MSG,
  LOGIN_OUT,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_PINGJIA,
  RECEIVE_SHOP_MSG
} from "./mutation-types";

import {
  getFoodList,
  geoFindMe,
  getShopList,
  autoGetUserMsg,
  quitLogin,
  getShopMsg,
  getShopPingJia,
  getShopGoods
} from "../api/index";
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
      const shopList = result.data;
      commit(RECEIVE_SHOP_LIST, { shopList });
    }
  },
  //*获取用户信息
  getUserMsg({ commit }, userMsg) {
    commit(RECEIVE_USER_MSG, { userMsg });
  },
  //*自动登录(自动获取缓存中的用户信息并登录)
  async autoLogin({ commit }) {
    const result = await autoGetUserMsg();
    if (result.code === 0) {
      const userMsg = result.data;
      commit(RECEIVE_USER_MSG, { userMsg });
    }
  },
  //*异步登出
  async loginOut({ commit }) {
    const result = await quitLogin();
    if (result.code === 0) {
      commit(LOGIN_OUT);
    }
  },
  //*异步获取商家商品
  async getGoods({ commit }, callback) {
    const result = await getShopGoods();
    if (result.code === 0) {
      const shopGoods = result.data;
      commit(RECEIVE_SHOP_GOODS, { shopGoods });
      callback && callback();
    }
  },
  //*异步获取商家评价
  async getPingJia({ commit }) {
    const result = await getShopPingJia();
    if (result.code === 0) {
      const shopPingJia = result.data;
      commit(RECEIVE_SHOP_PINGJIA, { shopPingJia });
    }
  },
  //*异步获取商家信息
  async getMsg({ commit }) {
    const result = await getShopMsg();
    if (result.code === 0) {
      const shopMsg = result.data;
      commit(RECEIVE_SHOP_MSG, { shopMsg });
    }
  }
};
