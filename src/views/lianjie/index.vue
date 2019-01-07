<template>
  <div id="lianjie">
    <div class="title">我的链接</div>
    <div class="content">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="邀请链接">
          <a :href="url">{{url}}</a>
        </el-form-item>
        <el-form-item label="二维码">
          <div class="qrcode">
            <div id="code"></div>
          </div>
        </el-form-item>
      </el-form>
    </div>
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
  .el-form-item__label
    color #ccc
  .title
    font-size 24px
    background rgba(0, 0, 0, .25)
    padding 20px
    color #ccc
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
    a
      color #fff
    img
      height 200px
      width 200px
</style>
