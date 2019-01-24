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
          <div class="color-change" v-for="(item, index) in items2" :key="item.id" :class="'color'+item.day">
            <span style="display:inline-block;width: 80px">种子成长{{index + 1}}</span>
            <span style="display:inline-block;width: 80px">第{{item.day}}天</span>
            <span style="display:inline-block;width: 180px">利息：{{item.account}}</span>
            <span style="display:inline-block;width: 200px">原种子：{{item.base_amount}}</span>
            <!-- <el-button style="margin-top:6px;" v-if="item.can_shou== 1" size="small" @click="con(item.id)" plain>确认收取</el-button> -->
          </div>
          <p v-show="itemsS2 !== ''" style="text-align: center; font-size: 14px; color: #999">{{itemsS2}}</p>
          <p v-show="items2.length == 0" style="text-align: center; font-size: 14px; color: #999">暂无数据</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>匹配成功后打币倒计时</span>
        </div>
        <div class="text item">
          <div class="pipei" v-for="(item, index) in items4" :key="item.id" @click="goDetail('/myrecord', '/myrecord')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date2" style="color:#f00;">{{item.rest_time | date}}</span></span>
          </div>
        </div>
        <p v-show="itemsS4 !== ''" style="text-align: center; font-size: 14px; color: #999">{{itemsS4}}</p>
        <p v-show="items4.length==0" style="text-align: center; font-size: 14px; color: #999">暂无数据</p>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收币确认倒计时显示</span>
        </div>
        <div class="text item">
          <div class="shoubi" v-for="(item, index) in items3" :key="item.id" @click="goDetail('/mypipei', '8-4')">
            <span style="display:inline-block;width: 50px">匹配{{index + 1}}</span>
            <span style="display:inline-block;width: 200px">倒计时：<span class="date1" style="color:#f00;">{{item.rest_time | date}}</span></span>
          </div>
          <p v-show="itemsS3 !== ''" style="text-align: center; font-size: 14px; color: #999">{{itemsS3}}</p>
          <p v-show="items3.length == 0" style="text-align: center; font-size: 14px; color: #999">暂无数据</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <p class="name" style="font-size:18px;color:#666;line-height:24px" @click="goUrl(1)">我的排单未完成匹配数<el-badge v-show="num1 > 0" :value="num1" class="item"></el-badge></p>
        </div>
        <div class="text item">
          <p class="name" style="font-size:18px;color:#666;line-height:24px" @click="goUrl(2)">我匹配的排单未完成数<el-badge v-show="num2 > 0" :value="num2" class="item"></el-badge></p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>监管信息</span>
        </div>
        <div class="text item">
          <div class="shoubi" style="overflow:hidden;" v-for="item in notice" :key="item.id" >
            <span style="display:inline-block;float:left;width: 65%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.content}}</span>
            <span style="display:inline-block;float:left;width: 30%">{{item.create_time}}</span>
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
      itemsS2: '',
      itemsS3: '',
      itemsS4: '',
      items2: [],
      items3: [],
      items4: [],
      timers: null,
      num1: 0,
      num2: 0,
      notice: [],
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
    get_notice () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_notice', params).then((res) => {
        this.notice = res.data.data
      })
    },
    painotice () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/painotice', params).then((res) => {
        this.num1 = res.data.data[1].count
        this.num2 = res.data.data[2].count
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
    con (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/shouqu', params).then((res) => {
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
        // this.items = res.data.data
        // this.items3 = res.data.data[3]
        // this.items4 = res.data.data[4]
        if (Object.prototype.toString.call(res.data.data[2]) === '[object Array]') {
          this.items2 = res.data.data[2]
          this.timers = setInterval(() => {
            this.items2.forEach((element, index) => {
              if (element.rest_time < 1) {
                return false
              }
              this.items2[index].rest_time = element.rest_time - 1
            })
          }, 1000)
        } else {
          this.items2 = []
          this.itemsS2 = res.data.data[2]
        }
        if (Object.prototype.toString.call(res.data.data[3]) === '[object Array]') {
          this.items3 = res.data.data[3]
          this.timers = setInterval(() => {
            this.items3.forEach((element, index) => {
              if (element.rest_time < 1) {
                return false
              }
              this.items3[index].rest_time = element.rest_time - 1
            })
          }, 1000)
        } else {
          this.items3 = []
          this.itemsS3 = res.data.data[3]
        }
        if (Object.prototype.toString.call(res.data.data[4]) === '[object Array]') {
          this.items4 = res.data.data[4]
          this.timers = setInterval(() => {
            this.items4.forEach((element, index) => {
              if (element.rest_time < 1) {
                return false
              }
              this.items4[index].rest_time = element.rest_time - 1
            })
          }, 1000)
        } else {
          this.items4 = []
          this.itemsS4 = res.data.data[4]
        }
        console.log(this.items3)
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
    this.painotice()
    this.get_notice()
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
      min-width: 800px;
      margin-left 2%
      margin-top 30px
      background #f5f5f5
      color #ccc
      @media screen and (max-width:480px)
        margin-top 10px
        width 96%
        min-width 96%
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
          background rgba(0,100,0, .8)
        .color2
          background rgba(0,100,0, .5)
        .color3
          background rgba(0,100,0, .3)
        .color4
          background rgba(255,215,0, .3)
        .color5
          background rgba(255,215,0, .5)
        .color6
          background rgba(255,215,0, .8)
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
