<template>
  <div id="home">
    <div class="title">合约资产</div>
    <div class="content">
      <el-row>
        <el-col :span="8">
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/money.png" alt="">
            </div>
            <div class="right">
              <h2>0.16</h2>
              <p>GLC币价（单位：美金）</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/money.png" alt="">
            </div>
            <div class="right">
              <h2>0.00</h2>
              <p>种子账户</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/money.png" alt="">
            </div>
            <div class="right">
              <h2>2500.00</h2>
              <p>认筹账户</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" >
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/money.png" alt="">
            </div>
            <div class="right">
              <h2>464458.00</h2>
              <p>奖励账户</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="wrapper">
            <div class="left">
              <img src="../../assets/img/money.png" alt="">
            </div>
            <div class="right">
              <h2>2102470.00</h2>
              <p>社群持币</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" >
          <div class="wrapper">
            <div class="title">最新公告</div>
            <div class="item">
              <p class="name">关于持币奖停止配送的通知</p>
              <p class="date">2018/12/31 16:05:54</p>
            </div>
            <div class="item">
              <p class="name">关于持币奖停止配送的通知</p>
              <p class="date">2018/12/31 16:05:54</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="wrapper">
            <div class="title">信息咨询</div>
            <div class="item">
              <div class="left">
                <img src="../../assets/img/money.png" alt="">
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
                <img src="../../assets/img/money.png" alt="">
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
                <img src="../../assets/img/money.png" alt="">
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus">
#home
  .title
    font-size 24px
    background #666
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
    .el-col-16, .el-col-8
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
    .el-col-16
      .item
        display flex
        justify-content space-between
        line-height 20px
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
            margin 10px
        .center
          float left
        .right
          float right
          text-align right
</style>
