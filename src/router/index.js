import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Index'
import home from '@/views/Home'
import ziliao from '@/views/Ziliao'
import lianjie from '@/views/lianjie'
import denglu from '@/views/Password/denglu'
import anquan from '@/views/Password/anquan'
import register from '@/views/Login/register'
import myinvite from '@/views/Myinvite'

// 财务
import liushui from '@/views/caiwu/liushui'

// 登陆注册
import login from '@/views/Login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: index,
      children: [{
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: '仙草坊'
        }
      }, {
        path: '/ziliao',
        name: 'ziliao',
        component: ziliao,
        meta: {
          title: '资料编辑'
        }
      }, {
        path: '/lianjie',
        name: 'lianjie',
        component: lianjie,
        meta: {
          title: '我的链接'
        }
      }, {
        path: '/denglu',
        name: 'denglu',
        component: denglu,
        meta: {
          title: '修改登录密码'
        }
      }, {
        path: '/anquan',
        name: 'anquan',
        component: anquan,
        meta: {
          title: '修改安全密码'
        }
      }, {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
          title: '立即注册'
        }
      }, {
        path: '/myinvite',
        name: 'myinvite',
        component: myinvite,
        meta: {
          title: '我的邀请'
        }
      }, {
        path: '/liushui',
        name: 'liushui',
        component: liushui,
        meta: {
          title: '我的流水'
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    }
  ]
})
