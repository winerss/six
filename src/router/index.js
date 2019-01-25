import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Index'
import home from '@/views/Home'
import myhome from '@/views/Home/myhome'
import ziliao from '@/views/Ziliao'
import lianjie from '@/views/lianjie'
import denglu from '@/views/Password/denglu'
import anquan from '@/views/Password/anquan'
import register from '@/views/Login/register'
import myinvite from '@/views/Myinvite'
import net from '@/views/Myinvite/net'

// 财务
import shouyi from '@/views/caiwu/shouyi'
import liushui from '@/views/caiwu/liushui'
import jingtai from '@/views/caiwu/jingtai'
import qingdan from '@/views/caiwu/qingdan'
import tibi from '@/views/caiwu/tibi'
import mingxi from '@/views/caiwu/mingxi'
import neibu from '@/views/caiwu/neibu'
import jiedian from '@/views/caiwu/jiedian'
import jilu from '@/views/caiwu/jilu'
import paidan from '@/views/caiwu/paidan'
import pipei from '@/views/caiwu/pipei'
import myrecord from '@/views/caiwu/myrecord'
import mypipei from '@/views/caiwu/mypipei'
import noticeDetail from '@/views/Home/noticeDetail'

// 邮箱
import news from '@/views/news'
import send from '@/views/news/send'
import sendList from '@/views/news/sendList'
import revice from '@/views/news/revice'

// 登陆注册
import login from '@/views/Login/login'
import unknow from '@/views/unknow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/myhome',
      component: index,
      children: [{
        path: '/myhome',
        name: 'myhome',
        component: myhome,
        meta: {
          title: ''
        }
      }, {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: ''
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
        path: '/net',
        name: 'net',
        component: net,
        meta: {
          title: '社群网络'
        }
      }, {
        path: '/shouyi',
        name: 'shouyi',
        component: shouyi,
        meta: {
          title: '收益明细'
        }
      },
      {
        path: '/liushui',
        name: 'liushui',
        component: liushui,
        meta: {
          title: '我的流水'
        }
      }, {
        path: '/jingtai',
        name: 'jingtai',
        component: jingtai,
        meta: {
          title: '静态收益'
        }
      }, {
        path: '/qingdan',
        name: 'qingdan',
        component: qingdan,
        meta: {
          title: '贡献清单'
        }
      }, {
        path: '/tibi',
        name: 'tibi',
        component: tibi,
        meta: {
          title: '提币'
        }
      }, {
        path: '/mingxi',
        name: 'mingxi',
        component: mingxi,
        meta: {
          title: '提币明细'
        }
      }, {
        path: '/neibu',
        name: 'neibu',
        component: neibu,
        meta: {
          title: '内部转账'
        }
      }, {
        path: '/jiedian',
        name: 'jiedian',
        component: jiedian,
        meta: {
          title: '节点转账'
        }
      }, {
        path: '/paidan',
        name: 'paidan',
        component: paidan,
        meta: {
          title: '播撒种子'
        }
      }, {
        path: '/pipei',
        name: 'pipei',
        component: pipei,
        meta: {
          title: '种子成长'
        }
      }, {
        path: '/myrecord',
        name: 'myrecord',
        component: myrecord,
        meta: {
          title: '播种记录'
        }
      }, {
        path: '/mypipei',
        name: 'mypipei',
        component: mypipei,
        meta: {
          title: '播种记录'
        }
      }, {
        path: '/jilu',
        name: 'jilu',
        component: jilu,
        meta: {
          title: '转账记录'
        }
      }, {
        path: '/news',
        name: 'news',
        component: news,
        meta: {
          title: '新闻公告'
        }
      }, {
        path: '/send',
        name: 'send',
        component: send,
        meta: {
          title: '发邮件'
        }
      }, {
        path: '/sendList',
        name: 'sendList',
        component: sendList,
        meta: {
          title: '发件箱'
        }
      }, {
        path: '/revice',
        name: 'revice',
        component: revice,
        meta: {
          title: '收件箱'
        }
      }, {
        path: '/noticeDetail/:id',
        name: 'noticeDetail',
        component: noticeDetail,
        meta: {
          title: '新闻详情'
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
    }, {
      path: '/404',
      name: '404',
      component: unknow,
      meta: {
        title: '404'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
