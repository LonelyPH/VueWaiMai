/*
 *路由器对象模块
 */
//* 引入vue、vue-router
import Vue from "vue";
import VueRouter from "vue-router";

//* 引入路由组件
// import MSite from "../pages/MSite/MSite.vue";
// import Order from "../pages/Order/Order.vue";
// import Profile from "../pages/Profile/Profile.vue";
// import Search from "../pages/Search/Search.vue";
//*路由组件懒加载
const MSite = () => import("../pages/MSite/MSite.vue");
const Order = () => import("../pages/Order/Order.vue");
const Profile = () => import("../pages/Profile/Profile.vue");
const Search = () => import("../pages/Search/Search.vue");

import Login from "../pages/Login/Login.vue";
import Shop from "../pages/Shop/Shop.vue";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue";
import ShopPingJia from "../pages/Shop/ShopPingJia/ShopPingJia.vue";
import ShopMsg from "../pages/Shop/ShopMsg/ShopMsg.vue";

//* 声明使用router插件
Vue.use(VueRouter);

export default new VueRouter({
  //* 配置所有路由
  routes: [
    {
      path: "/msite",
      component: MSite,
      meta: {
        //* 显示隐藏FooterGuide的标识
        showFooter: true
      }
    },
    {
      path: "/search",
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: "/order",
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: "/profile",
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/",
      redirect: "/msite"
    },
    {
      path: "/shop",
      component: Shop,
      children: [
        {
          path: "/shop/goods",
          component: ShopGoods
        },
        {
          path: "/shop/pingjia",
          component: ShopPingJia
        },
        {
          path: "/shop/msg",
          component: ShopMsg
        },
        {
          path: "",
          redirect: "/shop/goods"
        }
      ]
    }
  ]
});
