<template>
  <div id="index">
    <div class="menu">
      <el-menu
        :default-active="activeNav"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#999"
        active-text-color="#ffd04b">
        <el-menu-item index="0" style="margin-bottom: 40px">
          <img class="logo" src="../../assets/img/login.png" alt="">
          <div class="nickname"><span>{{data.nickname}}</span></div>
        </el-menu-item>
        <el-menu-item index="1" @click="goPage('1', '/home')">
          <img src="../../assets/img/zichan.png" alt="">
          <span slot="title">合约资产</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <img src="../../assets/img/ziliao.png" alt="">
            <span slot="title">资料编辑</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="goPage('4-1', '/lianjie')">
              <img src="../../assets/img/lianjie.png" alt="">
              <span slot="title">我的链接</span>
            </el-menu-item>
            <el-menu-item index="4-2" @click="goPage('4-2', '/ziliao')">
              <img src="../../assets/img/ziliao.png" alt="">
              <span slot="title">资料修改</span>
            </el-menu-item>
            <el-menu-item index="4-3" @click="goPage('4-3', 'denglu')">
              <img src="../../assets/img/mima.png" alt="">
              修改登录密码
            </el-menu-item>
            <el-menu-item index="4-4" @click="goPage('4-4', 'anquan')">
              <img src="../../assets/img/mima.png" alt="">
              修改安全密码
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <img src="../../assets/img/huiyuan.png" alt="">
            <span slot="title">会员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="goPage('6-1', '/register')">
              <img src="../../assets/img/zhuce.png" alt="">
              立即注册
            </el-menu-item>
            <el-menu-item index="6-2" @click="goPage('6-2', '/myinvite')">
              <img src="../../assets/img/yaoqing.png" alt="">
              我的邀请
            </el-menu-item>
            <el-menu-item index="6-3" @click="goPage('6-3', '/net')">
              <img src="../../assets/img/wangluo.png" alt="">
              社群网络
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="7">
          <template slot="title">
            <img src="../../assets/img/caiwu.png" alt="">
            <span slot="title">财务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="7-1" @click="goPage('7-1', '/liushui')">
              <img src="../../assets/img/liushui.png" alt="">
              我的流水
            </el-menu-item>
            <!-- <el-menu-item index="7-2" @click="goPage('7-2', '/qingdan')">
              <img src="../../assets/img/qingdan.png" alt="">
              贡献清单
            </el-menu-item> -->
            <el-menu-item index="7-3" @click="goPage('7-3', '/tibi')">
              <img src="../../assets/img/tibi.png" alt="">
              提币
            </el-menu-item>
            <el-menu-item index="7-4" @click="goPage('7-4', '/mingxi')">
              <img src="../../assets/img/shuoming.png" alt="">
              提币明细
            </el-menu-item>
            <el-menu-item index="7-5" @click="goPage('7-5', '/neibu')">
              <img src="../../assets/img/neibu.png" alt="">
              激活码转账
            </el-menu-item>
            <el-menu-item index="7-6" @click="goPage('7-6', '/jiedian')">
              <img src="../../assets/img/jiedian.png" alt="">
              排单币转账
            </el-menu-item>
            <el-menu-item index="7-7" @click="goPage('7-7', '/jilu')">
              <img src="../../assets/img/jilu.png" alt="">
              转账记录
            </el-menu-item>
          </el-menu-item-group>
          </el-submenu>
            <el-submenu index="8">
              <template slot="title">
                <img src="../../assets/img/tibi.png" alt="">
                <span slot="title">排单平台</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="8-1" @click="goPage('8-1', '/paidan')">
                  发起排单
                </el-menu-item>
                <el-menu-item index="8-2" @click="goPage('8-2', '/pipei')">
                  排单匹配
                </el-menu-item>
                <el-menu-item index="8-3" @click="goPage('8-3' ,'/myrecord')">
                  我的排单记录
                </el-menu-item>
                <el-menu-item index="8-4" @click="goPage('8-4' ,'/mypipei')">
                  我匹配的排单记录
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
        <!-- <el-submenu index="8">
          <template slot="title">
            <img src="../../assets/img/gonggao.png" alt="">
            <span slot="title">公告中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="8-1" @click="goPage('8-1', '/news')">
              <img src="../../assets/img/xinwen.png" alt="">
              新闻公告
            </el-menu-item>
            <el-submenu index="8-2">
              <template slot="title">
                <img src="../../assets/img/gonggao.png" alt="">
                <span slot="title">内部邮箱</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="8-2-1" @click="goPage('8-2-1', '/send')">
                  发邮件
                </el-menu-item>
                <el-menu-item index="8-2-2" @click="goPage('8-2-2', '/sendList')">
                  发件箱
                </el-menu-item>
                <el-menu-item index="8-2-3" @click="goPage('8-2-3' ,'/revice')">
                  收件箱
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu> -->
        <el-menu-item index="5" @click="layout">
          <img src="../../assets/img/zhuxiao.png" alt="">
          <span slot="title">注销登录</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="container" :class="isCollapse==true?'min-conatiner': 'max-conatiner'">
      <div class="collapse">
        <i class="el-icon-menu" @click="collapse"></i>
      </div>
      <div class="message">
        <el-dropdown>
          <el-button type="primary" size="small">
            <el-badge v-show="num3 > 0" :value="num3" class="item"></el-badge>
            <img src="../../assets/img/bell.png" alt="">
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goUrl(1)">我的排单未完成匹配数<el-badge :value="num1" class="item"></el-badge></el-dropdown-item>
            <el-dropdown-item @click.native="goUrl(2)">我匹配的排单未完成数<el-badge :value="num2" class="item"></el-badge></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <p class="reload">
          <i @click="reload()" style="color: #409EFF;font-size: 26px;" class="el-icon-refresh"></i><br>
        </p>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      activeNav: '',
      num1: 0,
      data: {},
      num2: 0,
      num3: 0
    }
  },
  mounted () {
    this.websitename()
    this.get_user_info()
    this.painotice()
    this.activeNav = localStorage.getItem('active') || '1'
    if (!localStorage.getItem('sid')) {
      this.$message.error('请重新登录')
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
    if (document.body.clientWidth < 480) {
      this.isCollapse = true
    }
  },
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    reload () {
      window.location.reload()
    },
    goPage (key, path) {
      localStorage.setItem('active', key)
      this.$router.push(path)
    },
    layout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    websitename () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/transfer/websitename', params).then((res) => {
        this.name = res.data.data
        document.title = res.data.data
      })
    },
    goUrl (type) {
      if (type === 1) {
        this.$router.push('/myrecord')
        localStorage.setItem('active', '8-3')
      } else {
        this.$router.push('/mypipei')
        localStorage.setItem('active', '8-4')
      }
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          console.log(data.data)
          this.data = data.data
        }
      })
    },
    painotice () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/painotice', params).then((res) => {
        this.num1 = res.data.data[1].count
        this.num2 = res.data.data[2].count
        this.num3 = res.data.data[1].count + res.data.data[2].count
      })
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scope>
img
  width 20px
#index
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-size cover
  .nickname
    margin-top 4px
    font-size 16px
    color #ccc
    line-height 30px
    text-align center
    span
      font-size 18px
    @media screen and (max-width:480px)
      line-height 28px
      margin-left 8px
      margin-top 0
      margin-bottom -8px
  .logo
    width 40px
    display block
    margin 8px auto
  .el-menu--collapse
    .logo
      margin-left -10px
      padding-top 10px
  .menu
    position relative
    height 100%
    float left
    background rgba(0,0,0,0.8)
    .el-menu
      height 100%
      overflow-x hidden
      border-right none
      background rgba(0 ,0, 0, .25)
  .min-conatiner
    left 64px
    transition: left .4s
    @media screen and (max-width:480px)
      left 0
      background #fff
      z-index 999
  .max-conatiner
    left 200px
    transition: left .5s;
  .container
    position absolute
    right 0
    top 0
    bottom 0
    .collapse
      background rgba(0, 0, 0, 0.8)
      width 100%
      .el-icon-menu
        font-size 30px
        padding 10px 20px
        cursor pointer
        color #ccc
    .message
      position absolute
      right 20px
      top 10px
      bottom 0
      height 40px
      width 100px
      .reload
        float left
        margin-left 20px
        margin-top 2px
        font-weight bold
        color #cccccc
        line-height 20px
        @media screen and (max-width:480px)
          margin-top 8px
      .el-dropdown
        float left
      .el-button
        padding 0
        background #333
        border-color #333
      @media screen and (max-width:480px)
        right 2px
        top 6px
        height 40px
        width 80px
      .el-badge__content
        position absolute
        top -30px
        right -35px
        border 0
        line-height: 16px;
        @media screen and (max-width:480px)
          font-size 8px
      img
        width 24px
        margin-top 5px
        @media screen and (max-width:480px)
          width 20px
          margin-top 14px
  .el-menu-vertical-demo:not(.el-menu--collapse)
    width 200px
  .el-submenu__title:hover, .el-menu-item:focus, .el-menu-item:hover
    background-color rgba(0, 0, 0, .6)
</style>
