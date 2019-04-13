/*
 *入口JS
 */
import Vue from "vue";
import {Button} from "mint-ui"
import App from "./App.vue";
import router from "./router";
import store from "./store";
//*引入mock数据模块
import "./mock/mockServer"

//*注册全局组件标签Button
Vue.component(Button.name, Button);

var vm = new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
Vue.use(vm);
