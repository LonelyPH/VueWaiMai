/*
 *入口JS
 */
import Vue from "vue";
import { Button } from "mint-ui";
import VueLazyload from "vue-lazyload";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//*加载mock数据模块
import "./mock/mockServer";
//*加载过滤器
import "./filters/index";

import loading from "./common/images/loading.gif";

//*注册全局组件标签Button
Vue.component(Button.name, Button);

Vue.use(VueLazyload, { loading });

var vm = new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
Vue.use(vm);
