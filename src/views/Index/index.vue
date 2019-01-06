<template>
  <div id="index">
    <div class="menu">
      <el-menu
        default-active="2"
        @open="handleOpen"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @close="handleClose"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="-1">
          <img class="logo" src="../../assets/img/login.png" alt="">
        </el-menu-item>
        <el-menu-item index="1" @click="goPage('/home')">
          <img src="../../assets/img/zichan.png" alt="">
          <span slot="title">合约资产</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goPage('/ziliao')">
          <img src="../../assets/img/ziliao.png" alt="">
          <span slot="title">资料编辑</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goPage('/lianjie')">
          <img src="../../assets/img/lianjie.png" alt="">
          <span slot="title">我的链接</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <img src="../../assets/img/mima.png" alt="">
            <span slot="title">修改密码</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="goPage('denglu')">
              <img src="../../assets/img/mima.png" alt="">
              修改登录密码
            </el-menu-item>
            <el-menu-item index="4-2" @click="layout('anquan')">
              <img src="../../assets/img/mima.png" alt="">
              修改安全密码
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5" @click="layout">
          <img src="../../assets/img/zhuxiao.png" alt="">
          <span slot="title">注销登录</span>
        </el-menu-item>

        <el-submenu index="6">
          <template slot="title">
            <img src="../../assets/img/huiyuan.png" alt="">
            <span slot="title">会员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="goPage('/register')">
              <img src="../../assets/img/zhuce.png" alt="">
              立即注册
            </el-menu-item>
            <el-menu-item index="6-2" @click="goPage('/myinvite')">
              <img src="../../assets/img/yaoqing.png" alt="">
              我的邀请
            </el-menu-item>
            <el-menu-item index="6-3" @click="goPage">
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
            <el-menu-item index="6-1" @click="goPage('/liushui')">
              <img src="../../assets/img/liushui.png" alt="">
              我的流水
            </el-menu-item>
            <el-menu-item index="6-2" @click="goPage">
              <img src="../../assets/img/qingdan.png" alt="">
              贡献清单
            </el-menu-item>
            <el-menu-item index="6-3" @click="goPage">
              <img src="../../assets/img/tibi.png" alt="">
              提币
            </el-menu-item>
            <el-menu-item index="6-4" @click="goPage">
              <img src="../../assets/img/shuoming.png" alt="">
              提币说明
            </el-menu-item>
            <el-menu-item index="6-5" @click="goPage">
              <img src="../../assets/img/neibu.png" alt="">
              内部转账
            </el-menu-item>
            <el-menu-item index="6-6" @click="goPage">
              <img src="../../assets/img/jiedian.png" alt="">
              节点转账
            </el-menu-item>
            <el-menu-item index="6-7" @click="goPage">
              <img src="../../assets/img/jilu.png" alt="">
              转账记录
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="8">
          <template slot="title">
            <img src="../../assets/img/gonggao.png" alt="">
            <span slot="title">公告中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="8-1" @click="goPage">
              <img src="../../assets/img/xinwen.png" alt="">
              新闻公告
            </el-menu-item>
            <el-menu-item index="8-2" @click="goPage">
              <img src="../../assets/img/youxiang.png" alt="">
              内部邮箱
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="container" :class="isCollapse==true?'min-conatiner': 'max-conatiner'">
      <div class="collapse">
        <i class="el-icon-menu" @click="collapse"></i>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    goPage (path) {
      this.$router.push(path)
    },
    layout () {
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
img
  width 20px
#index
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background url('../../assets/img/max.jpg')
  background-size cover
  .logo
    width 40px
    padding-top 8px
    margin-left 40px
    display block
  .el-menu--collapse
    .logo
      margin-left -10px
      padding-top 10px
  .menu
    position relative
    height 100%
    float left
    .el-menu
      height 100%
      overflow hidden
      border-right none
      background rgba(0 ,0, 0, .25)
  .min-conatiner
    left 64px
    transition: left .4s;
  .max-conatiner
    left 200px
    transition: left .5s;
  .container
    position absolute
    right 0
    .collapse
      background #333
      width 100%
      .el-icon-menu
        font-size 30px
        padding 10px 20px
        color #ccc
        cursor pointer
  .el-menu-vertical-demo:not(.el-menu--collapse)
    width 200px
</style>
