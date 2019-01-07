<template>
  <div id="ziliao">
    <div class="title">资料修改</div>
    <div class="content">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号码">
          <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="钱包地址">
          <el-input v-model="address" placeholder="请输入钱包地址"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥" required>
          <el-input type="password" v-model="pass" placeholder="请输入安全密钥"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认修改</el-button>
        </el-form-item>
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
    submitForm () {
      if (!this.phone) {
        this.$message.error('请输入手机号码')
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
  components: {
  }
}
</script>

<style lang="stylus">
#ziliao
  .el-form-item__label
    color #ccc
  .el-button
    display block
  .title
    font-size 24px
    background rgba(0, 0, 0, .25)
    padding 20px
    color #ccc
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
</style>
