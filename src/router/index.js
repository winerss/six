import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/views/Index')
const home = () => import('@/views/Home')
const myhome = () => import('@/views/Home/myhome')
const ziliao = () => import('@/views/Ziliao')
const lianjie = () => import('@/views/lianjie')
const denglu = () => import('@/views/Password/denglu')
const anquan = () => import('@/views/Password/anquan')
const register = () => import('@/views/Login/register')
const myinvite = () => import('@/views/Myinvite')
const net = () => import('@/views/Myinvite/net')
// 财务
const shouyi = () => import('@/views/caiwu/shouyi')
const liushui = () => import('@/views/caiwu/liushui')
const jingtai = () => import('@/views/caiwu/jingtai')
const qingdan = () => import('@/views/caiwu/qingdan')
const tibi = () => import('@/views/caiwu/tibi')
const mingxi = () => import('@/views/caiwu/mingxi')
const neibu = () => import('@/views/caiwu/neibu')
const jiedian = () => import('@/views/caiwu/jiedian')
const jilu = () => import('@/views/caiwu/jilu')
const paidan = () => import('@/views/caiwu/paidan')
const pipei = () => import('@/views/caiwu/pipei')
const myrecord = () => import('@/views/caiwu/myrecord')
const mypipei = () => import('@/views/caiwu/mypipei')
const noticeDetail = () => import('@/views/Home/noticeDetail')
// 邮箱
const news = () => import('@/views/news')
const send = () => import('@/views/news/send')
const sendList = () => import('@/views/news/sendList')
const revice = () => import('@/views/news/revice')
// 登陆注册
const login = () => import('@/views/Login/login')
const unknow = () => import('@/views/unknow')

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
