<template>
  <div id="myhome">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发起排单</span>
        </div>
        <div class="text item">
          <h2>{{data.zhu_point}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>排单匹配倒计时显示</span>
        </div>
        <div class="text item">
          <h2>{{data.all_point}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收币利息</span>
        </div>
        <div class="text item">
          <div class="color-change" v-for="(item, index) in items[2]" :key="item.id" :class="'color'+item.day">
            <span style="display:inline-block;width: 50px">排单{{index + 1}}</span>
            <span style="display:inline-block;width: 80px">第{{item.day}}天</span>
            <span style="display:inline-block;width: 120px">利息：{{item.account}}</span>
            <el-button style="margin-top:6px;" v-if="item.can_shou== 1" size="small" plain>确认收取</el-button>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收币确认倒计时显示</span>
        </div>
        <div class="text item">
          <div class="shoubi" v-for="(item, index) in items[3]" :key="item.id" @click="goDetail('/mypipei')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date1">{{item.rest_time}}</span></span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>匹配成功后打币倒计时</span>
        </div>
        <div class="text item">
          <div class="pipei" v-for="(item, index) in items[4]" :key="item.id" @click="goDetail('/myrecord')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date2">{{item.rest_time}}</span></span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {},
      items: [],
      timers1: null,
      timers2: null
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.data = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    shouye () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/shouye', params).then((res) => {
        this.items = res.data.data
        this.timers1 = setInterval(() => {
          this.items[3].forEach((element, index) => {
            if (element.rest_time < 1) {
              return false
            }
            this.items[3][index].rest_time = element.rest_time - 1
          })
        }, 1000)
        this.timers2 = setInterval(() => {
          this.items[4].forEach((element, index) => {
            if (element.rest_time < 1) {
              return false
            }
            this.items[4][index].rest_time = element.rest_time - 1
          })
        }, 1000)
      })
    },
    goDetail (path) {
      this.$router.push(path)
    }
  },
  created () {
    this.get_user_info()
    this.shouye()
  },
  beforeDestroy () {
    clearInterval(this.timers)
    clearInterval(this.timers2)
  },
  mounted () {
  },
  components: {
  }
}
</script>

<style lang="stylus">
#myhome
  @media screen and (max-width:480px)
    .el-card__header
      padding 12px 10px
    .el-card__body
      padding 10px
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .nickname
    margin-top 10px
    margin-bottom -20px
    font-size 16px
    color #666
    line-height 40px
    margin-left 30px
    text-align left
    span
      font-size 18px
    @media screen and (max-width:480px)
      line-height 28px
      margin-left 8px
      margin-top 0
      margin-bottom -8px
  .content
    .box-card
      display block
      width 46%
      margin-left 2%
      margin-top 30px
      background #f5f5f5
      color #ccc
      @media screen and (max-width:480px)
        margin-top 10px
        width 96%
      .clearfix
        font-size 18px
        color #666
        @media screen and (max-width:480px)
          font-size 14px
        img
          float left
          margin-right 10px
          @media screen and (max-width:480px)
            height 20px
            margin-top -4px
      .el-card__body
        color #333
      .item
        font-size 24px
        .color-change
          margin-bottom 4px
          font-size 14px
          color #fff
          line-height 30px
          padding 0 4px
          .el-button
            padding: 2px 8px !important;
        .color1
          background rgba(255, 0, 0, .3)
        .color2
          background rgba(255, 0, 0, .4)
        .color3
          background rgba(255, 0, 0, .5)
        .color4
          background rgba(255, 0, 0, .6)
        .color5
          background rgba(255, 0, 0, .7)
        .color6
          background rgba(255, 0, 0, .8)
        .color7
          background rgba(255, 0, 0, .9)
        .shoubi,.pipei
          cursor pointer
          margin-bottom 4px
          font-size 14px
          color #333
          line-height 30px
          padding 0 4px
        @media screen and (max-width:480px)
          font-size 18px
</style>
