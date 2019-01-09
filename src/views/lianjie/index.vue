<template>
  <div id="lianjie">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的链接</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="text item">
        <p class="name">邀请链接:</p>
        <a :href="url">{{url}}</a>
        <p class="name">二维码</p>
        <div class="qrcode">
          <div id="code"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/get_user_qcode', params).then((res) => {
        this.url = res.data.data.url
        this.qrcode()
      })
    },
    qrcode () {
      let qrcode = new QRCode('code', {
        width: 150,
        height: 150, // 高度
        text: this.url // 二维码内容
      })
      console.log(qrcode)
    }
  },
  mounted () {
    this.getData()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#lianjie
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .box-card
    margin 20px
    padding 40px
    @media screen and (max-width:480px)
      padding 10px 0
    .name
      font-size 18px
      @media screen and (max-width:480px)
        font-size 14px
    a
      color #409EFF
      padding-left 80px
      line-height 40px
      font-size 20px
      text-decoration underline
      @media screen and (max-width:480px)
        font-size 14px
        padding 0 8px
        line-height 20px
    img
      margin-top 20px
      margin-left 80px
      height 200px
      width 200px
      @media screen and (max-width:480px)
        margin 0 auto
</style>
