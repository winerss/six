<template>
  <div id="neibu">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>激活码转账</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <p class="tips">激活码余额: {{zhu_point}}</p>
      <el-form label-width="80px" class="demo-ruleForm">
        <el-form-item label="接收用户" required>
          <el-input v-model="host" placeholder="请输入接收用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="转换数量" required>
          <el-input v-model="num" placeholder="请输入转换数量"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required>
          <el-input v-model="pass" type="password" placeholder="请输入安全密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">确认转换</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      host: '',
      num: '',
      zhu_point: '',
      pass: ''
    }
  },
  methods: {
    submitForm () {
      if (!this.host) {
        this.$message.error('请输入接收用户昵称')
        return false
      }
      if (!this.num) {
        this.$message.error('请输入转换数量')
        return false
      }
      if (!this.pass) {
        this.$message.error('请输入安全密码')
        return false
      }
      var params = new FormData()
      params.append('type', 1)
      params.append('host', this.host)
      params.append('amount', this.num)
      params.append('erji', this.pass)
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/transfer/from_host', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          window.location.reload()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          console.log(data.data)
          this.zhu_point = data.data.zhu_point
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  mounted () {
    this.get_user_info()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#neibu
  .el-form-item__label
    color #ccc
    text-align left
  .el-button
    display block
    margin 0 auto
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .content
    position relative
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 60px 40px
    @media screen and (max-width:480px)
      padding 40px 0
      background none
    .tips
      position absolute
      top 20px
      left 20px
      right 20px
      padding-bottom 10px
      border-bottom 1px solid #333
      color #f5f5f5
      font-size 16px
      @media screen and (max-width:480px)
        top 0px
        left 0
        right 0
</style>
