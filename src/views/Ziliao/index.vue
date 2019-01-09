<template>
  <div id="ziliao">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>资料修改</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form label-width="80px" class="demo-ruleForm">
        <el-form-item label="手机号码">
          <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="钱包地址">
          <el-input v-model="address" placeholder="请输入钱包地址"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥" required>
          <el-input type="password" v-model="pass" placeholder="请输入安全密钥"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">确认修改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      address: '',
      pass: ''
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          console.log(data.data)
          this.phone = data.data.tel
          this.address = data.data.money_address
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    submitForm () {
      if (!this.phone) {
        this.$message.error('请输入手机号码')
        return false
      }
      let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(this.phone)) {
        this.$message.error('请检查您的手机格式')
        return false
      }
      if (!this.address) {
        this.$message.error('请输入钱包地址')
        return false
      }
      if (!this.pass) {
        this.$message.error('请输入密钥')
        return false
      }
      var params = new FormData()
      params.append('tel', this.phone)
      params.append('money_address', this.address)
      params.append('erji', this.pass)
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/edit_userinfo', params).then((res) => {
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
#ziliao
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .el-form-item__label
    color #333
  .el-button
    display block
    margin 0 auto
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
    @media screen and (max-width:480px)
      padding 0
      background none
</style>
