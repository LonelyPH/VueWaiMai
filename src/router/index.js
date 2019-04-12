/*
 *路由器对象模块
 */
//* 引入vue、vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

//* 引入路由组件
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'


//* 声明使用router插件
Vue.use(VueRouter)

export default new VueRouter({
  //* 配置所有路由
  routes: [{
      path: '/msite',
      component: MSite,
      meta: { //* 显示隐藏FooterGuide的标识
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
