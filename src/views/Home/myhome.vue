<template>
  <div id="myhome">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-card class="box-card">
        <div class="clearfix" style="cursor:pointer;" @click="goDetail('/paidan', '8-1')">
          <span>播撒种子</span>
        </div>
      </el-card>
      <!-- <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>种子成长倒计时显示</span>
        </div>
        <div class="text item">
         <div class="shoubi" v-for="(item, index) in items[1]" :key="item.id" @click="goDetail('/pipei', '8-2')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date1">{{item.rest_time | date}}</span></span>
          </div>
        </div>
      </el-card> -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>种子成长</span>
        </div>
        <div class="text item">
          <div class="color-change" v-for="(item, index) in items[2]" :key="item.id" :class="'color'+item.day">
            <span style="display:inline-block;width: 80px">播撒种子{{index + 1}}</span>
            <span style="display:inline-block;width: 80px">第{{item.day}}天</span>
            <span style="display:inline-block;width: 120px">利息：{{item.account}}</span>
            <!-- <el-button style="margin-top:6px;" v-if="item.can_shou== 1" size="small" @click="con(item.id)" plain>确认收取</el-button> -->
          </div>
          <p v-show="items[2].length == 0" style="text-align: center; font-size: 14px; color: #999">暂无数据</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收币确认倒计时显示</span>
        </div>
        <div class="text item">
          <div class="shoubi" v-for="(item, index) in items[3]" :key="item.id" @click="goDetail('/mypipei', '8-4')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date1">{{item.rest_time | date}}</span></span>
          </div>
          <p v-show="items[3].length == 0" style="text-align: center; font-size: 14px; color: #999">暂无数据</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>匹配成功后打币倒计时</span>
        </div>
        <div class="text item">
          <div class="pipei" v-for="(item, index) in items[4]" :key="item.id" @click="goDetail('/myrecord', '/myrecord')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date2">{{item.rest_time | date}}</span></span>
          </div>
        </div>
        <p v-show="items[4].length==0" style="text-align: center; font-size: 14px; color: #999">暂无数据</p>
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
      timers: null,
      timers1: null,
      timers2: null
    }
  },
  filters: {
    date: function (val) {
      var h = parseInt(val / (60 * 60) % 24, 10)
      var m = parseInt(val / 60 % 60, 10)
      var s = parseInt(val % 60, 10)
      return h + '小时' + m + '分钟' + s + '秒'
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
    con (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/shouqu', params).then((res) => {
        console.log(res)
        let data = res.data
        if (data.code === 1) {
          this.$message({
            type: 'success',
            message: data.msg
          })
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
        if (this.items[1]) {
          this.timers = setInterval(() => {
            this.items[1].forEach((element, index) => {
              if (element.rest_time < 1) {
                return false
              }
              this.items[1][index].rest_time = element.rest_time - 1
            })
          }, 1000)
        }
        if (this.items[3]) {
          this.timers1 = setInterval(() => {
            this.items[3].forEach((element, index) => {
              if (element.rest_time < 1) {
                return false
              }
              this.items[3][index].rest_time = element.rest_time - 1
            })
          }, 1000)
        }
        if (this.items[4]) {
          this.timers2 = setInterval(() => {
            this.items[4].forEach((element, index) => {
              if (element.rest_time < 1) {
                return false
              }
              this.items[4][index].rest_time = element.rest_time - 1
            })
          }, 1000)
        }
      })
    },
    goDetail (path, type) {
      localStorage.setItem('active', type)
      this.$router.push(path)
    }
  },
  created () {
    this.get_user_info()
    this.shouye()
  },
  beforeDestroy () {
    clearInterval(this.timers)
    clearInterval(this.timers1)
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
          color #555
          line-height 30px
          padding 0 4px
          .el-button
            padding: 2px 8px !important;
        .color1
          background rgba(0, 255, 0, .3)
        .color2
          background rgba(0, 255, 0, .5)
        .color3
          background rgba(0, 255, 0, .8)
        .color4
          background rgba(255, 128, 0, .3)
        .color5
          background rgba(255, 128, 0, .5)
        .color6
          background rgba(255, 255, 0, .8)
        .color7
          background rgba(255, 0, 0, .3)
        .color8
          background rgba(255, 0, 0, .5)
        .color9
          background rgba(255, 0, 0, .8)
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
