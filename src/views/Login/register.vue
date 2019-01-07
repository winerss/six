<template>
  <div id="register">
    <div class="title">基本信息</div>
    <div class="content">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" required>
          <el-input v-model="name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="钱包地址" required>
          <el-input v-model="money_address" placeholder="请输入钱包地址"></el-input>
        </el-form-item>
        <el-form-item label="邀请人昵称" required>
          <el-input v-model="user" placeholder="请输入邀请人昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" required>
          <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机验证码" required class="code-wrapper">
          <el-input v-model="code" placeholder="请输入手机验证码"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </el-form-item> -->
        <el-form-item label="登录密码" required>
          <el-input v-model="password" type="password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥" required>
          <el-input type="password" v-model="pass" placeholder="请输入安全密钥"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number: '',
      name: '',
      user: '',
      phone: '',
      money_address: '',
      code: '',
      password: '',
      pass: ''
    }
  },
  methods: {
    submitForm () {
      if (!this.name) {
        this.$message.error('请输入昵称')
        return false
      }
      if (!this.money_address) {
        this.$message.error('请输入钱包地址')
        return false
      }
      if (!this.user) {
        this.$message.error('请输入邀请人昵称')
        return false
      }
      if (!this.phone) {
        this.$message.error('请输入手机号')
        return false
      }
      // if (!this.code) {
      //   this.$message.error('请输入验证码')
      //   return false
      // }
      if (!this.password) {
        this.$message.error('请输入登录密码')
        return false
      }
      if (!this.pass) {
        this.$message.error('请输入安全密钥')
        return false
      }
      var params = new FormData()
      params.append('username', this.name)
      params.append('leader_user', this.user)
      params.append('tel', this.phone)
      params.append('money_address', this.money_address)
      params.append('password', this.password)
      params.append('erji', this.pass)
      // params.append('code', this.code)
      this.axios.post(process.env.API_ROOT + '/api/login/zhuce', params).then((res) => {
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
#register
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
    .code-wrapper
      .el-input
        width 80%
</style>
