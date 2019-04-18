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
  RECEIVE_SHOP_MSG,
  JIA_COUNT,
  JIAN_COUNT,
  CLEAR_CART,
  SEARCH_SHOP_LIST
} from "./mutation-types";

import {
  getFoodList,
  geoFindMe,
  getShopList,
  autoGetUserMsg,
  quitLogin,
  getShopMsg,
  getShopPingJia,
  getShopGoods,
  searchShopList
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
      //*异步数据获取到之后执行回调 替代watch作数据监视
      callback && callback();
    }
  },
  //*异步获取商家评价
  async getPingJia({ commit }, callback) {
    const result = await getShopPingJia();
    if (result.code === 0) {
      const shopPingJia = result.data;
      commit(RECEIVE_SHOP_PINGJIA, { shopPingJia });
      //*异步数据获取到之后执行回调 替代watch作数据监视
      callback && callback();
    }
  },
  //*异步获取商家信息
  async getMsg({ commit }) {
    const result = await getShopMsg();
    if (result.code === 0) {
      const shopMsg = result.data;
      commit(RECEIVE_SHOP_MSG, { shopMsg });
    }
  },
  //*同步更新点餐数量
  updataCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(JIA_COUNT, { food });
    } else {
      commit(JIAN_COUNT, { food });
    }
  },
  //*清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART);
  },
  //*根据经纬度及关键字异步搜索商家列表
  async search({ commit }, keyword) {
    const geohash = "40.10038,116.36867";
    const result = await searchShopList({ geohash, keyword });
    if (result.code === 0) {
      const searchedShops = result.data;
      commit(SEARCH_SHOP_LIST, { searchedShops });
    } else {
    }
  }
};
