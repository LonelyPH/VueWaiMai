/* 
*vuex核心管理文件
*/

import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  //配置
  state,
  actions,
  mutations,
  getters
})