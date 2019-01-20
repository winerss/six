<template>
  <div id="home">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>合约资产</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="nickname">
        用户：<span>{{data.nickname}}</span>
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="../../assets/img/qianbao.png" alt="">
          <span>激活码</span>
        </div>
        <div class="text item">
          <h2>{{data.zhu_point}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="../../assets/img/star.png" alt="">
          <span>大盘币</span>
        </div>
        <div class="text item">
          <h2>{{data.all_point}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="../../assets/img/qianbao.png" alt="">
          <span>排单币</span>
        </div>
        <div class="text item">
          <h2>{{data.enroll_point}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="../../assets/img/heart.png" alt="">
          <span>推荐人数</span>
        </div>
        <div class="text item">
          <h2>{{data.tui_sum}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="../../assets/img/qianbao.png" alt="">
          <span>团队人数</span>
        </div>
        <div class="text item">
          <h2>{{data.team_sum}}</h2>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="../../assets/img/qianbao.png" alt="">
          <span>动态奖金</span>
        </div>
        <div class="text item">
          <h2>{{data.dongtai_point}}</h2>
        </div>
      </el-card>
      <el-card class="box-card news msg">
        <div slot="header" class="clearfix">
          <span>我的信息</span>
        </div>
        <div class="text item">
          <p class="name" @click="goUrl(1)">我的排单未完成匹配数<el-badge v-show="num1 > 0" :value="num1" class="item"></el-badge></p>
        </div>
        <div class="text item">
          <p class="name" @click="goUrl(2)">我匹配的排单未完成数<el-badge v-show="num2 > 0" :value="num2" class="item"></el-badge></p>
        </div>
      </el-card>
      <el-card class="box-card news">
        <div slot="header" class="clearfix">
          <span>最新公告</span>
        </div>
        <div class="text item" v-for="(item, index) in news" :key="index" @click="goDetail(item.id)">
          <p class="name">{{item.content}}</p>
          <p class="date">{{item.date}}</p>
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
      num1: 0,
      num2: 0,
      news: []
    }
  },
  created () {
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          console.log(data.data)
          this.data = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    get_record () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_record').then((res) => {
        this.news = res.data.data.slice(0, 5)
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
    painotice () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/painotice', params).then((res) => {
        this.num1 = res.data.data[1].count
        this.num2 = res.data.data[2].count
      })
    },
    goDetail (id) {
      this.$router.push('/noticeDetail/' + id)
    }
  },
  mounted () {
    this.get_user_info()
    this.get_record()
    this.painotice()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#home
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
    color #333
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
      width 27%
      margin-left 2%
      margin-top 30px
      background #006400
      color #fff
      @media screen and (max-width:480px)
        width 46%
        margin-top 10px
      float left
      .clearfix
        font-size 18px
        @media screen and (max-width:480px)
          font-size 14px
        img
          float left
          margin-right 10px
          @media screen and (max-width:480px)
            height 20px
            margin-top -4px
      .item
        font-size 24px
        @media screen and (max-width:480px)
          font-size 18px
    .news
      width 40%
      margin-left 2%
      padding-bottom 20px
      @media screen and (max-width:480px)
        width 95%
        margin-bottom 20px
        padding-bottom 0
      .item
        overflow hidden
        .name
          float left
          font-size 18px
          cursor pointer
          line-height 24px
          .el-badge
            vertical-align inherit
            .el-badge__content
              margin-top -4px
              border 0
              line-height 16px
        .date
          float right
          font-size 16px
</style>
