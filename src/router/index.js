import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import VueRouter from "vue-router";
//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样是这样
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/page/page1',
          name: 'page1',
          component: () => import('../views/page/page1.vue')
        }, {
          path: '/page/page2',
          name: 'page1',
          component: () => import('../views/page/page2.vue')
        }, {
          path: '/page/page3',
          name: 'page3',
          component: () => import('../views/page/page3.vue')
        }, {
          path: '/page/page4',
          name: 'page4',
          component: () => import('../views/page/page4.vue')
        }, {
          path: '/information/information1',
          name: 'information1',
          component: () => import('../views/information/information1.vue')
        }
        , {
          path: '/information/information2',
          name: 'information1',
          component: () => import('../views/information/information2.vue')
        }
      ]
    }
  ]
})
