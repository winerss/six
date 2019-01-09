<template>
  <div id="home">
    <div class="title">合约资产</div>
    <div class="content">
      <el-row>
        <el-col :span="8">
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/qianbao.png" alt="">
            </div>
            <div class="right">
              <h2>{{data.zhu_point}}</h2>
              <p>激活码</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/star.png" alt="">
            </div>
            <div class="right">
              <h2>{{data.all_point}}</h2>
              <p>大盘币</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/glass.png" alt="">
            </div>
            <div class="right">
              <h2>{{data.enroll_point}}</h2>
              <p>排单币</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" >
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/heart.png" alt="">
            </div>
            <div class="right">
              <h2>{{data.tui_sum}}</h2>
              <p>推荐人数</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/coin.png" alt="">
            </div>
            <div class="right">
              <h2>{{data.team_sum}}</h2>
              <p>团队人数</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <div class="wrapper">
            <div class="title">最新公告</div>
            <div class="item" v-for="(item, index) in news" :key="index" @click="goDetail(item.id)">
              <p class="name">{{item.content}}</p>
              <p class="date">{{item.date}}</p>
            </div>
          </div>
        </el-col>
        <!-- <el-col :span="8" >
          <div class="wrapper">
            <div class="title">信息咨询</div>
            <div class="item">
              <div class="left">
                <img src="../../assets/img/info.png" alt="">
              </div>
              <div class="center">
                <p class="name">个人信息</p>
                <p class="date">注册日期：2018-07-18</p>
              </div>
              <div class="right">
                <p>413237[成熟]</p>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <img src="../../assets/img/shequn.png" alt="">
              </div>
              <div class="center">
                <p class="name">我的社群</p>
                <p class="date">社群：128</p>
              </div>
              <div class="right">
                <p></p>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <img src="../../assets/img/email.png" alt="">
              </div>
              <div class="center">
                <p class="name">我的收件箱</p>
                <p class="date">0</p>
              </div>
              <div class="right">
                <p>0条新信息</p>
              </div>
            </div>
            <p class="date"></p>
          </div>
        </el-col> -->
      </el-row>
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
    font-size 24px
    background rgba(0, 0, 0, .25)
    padding 20px
    color #ccc
  .content
    padding 20px
    .none
      background none !important
    .el-col-8
      padding 0 20px
      .wrapper
        background rgba(0, 0, 0, .25)
        margin-top 20px
        padding 0 10px
        border-radius 8px
        .left
          float left
          img
            height 42px
            width 42px
            margin 19px 30px 0 10px
        .right
          color #ccc
          h2
            font-size 30px
            line-height 50px
          p
            font-size 14px
            line-height 20px
    .el-col-24, .el-col-8
      padding 0 20px
      .wrapper
        background rgba(0, 0, 0, .25)
        margin-top 20px
        padding 0 10px
        border-radius 8px
        color #ccc
        padding-bottom 20px
        .title
          font-size 16px
          background none
          padding 10px
    .el-col-24
      .item
        display flex
        justify-content space-between
        line-height 20px
        cursor pointer
        p
          padding 4px 10px
    .el-col-8
      .item
        line-height 20px
        margin-top 8px
        overflow hidden
        .left
          img
            float left
            width 20px
            height 20px
            margin 2px 10px
        .center
          float left
        .right
          float right
          text-align right
</style>
