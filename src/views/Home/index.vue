<template>
  <div id="home">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>合约资产</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
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
    goDetail (id) {
      this.$router.push('/noticeDetail/' + id)
    }
  },
  mounted () {
    this.get_user_info()
    this.get_record()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#home
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .content
    .box-card
      width 27%
      margin-left 2%
      margin-top 30px
      background rgba(0, 0, 0, 0.8)
      color #ccc
      @media screen and (max-width:480px)
        width 95%
        margin-top 10px
      float left
      .clearfix
        font-size 18px
        img
          float left
          margin-right 10px
      .item
        font-size 24px
    .news
      width 85%
      padding-bottom 20px
      @media screen and (max-width:480px)
        width 95%
        margin-bottom 20px
      .item
        overflow hidden
        .name
          float left
          font-size 18px
        .date
          float right
          font-size 16px
</style>
