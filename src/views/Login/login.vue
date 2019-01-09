<template>
  <div id="login">
    <div class="login">
      <img src="../../assets/img/login.png" alt="">
      <el-input v-model="name" placeholder="请输入昵称"></el-input>
      <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
      <el-button type="primary" @click="login">立即登录</el-button>
      <el-button type="primary">找回密码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    goPages (path) {
      this.$router.push(path)
    },
    login () {
      if (this.name.length > 10 || this.name.length < 3) {
        this.$message.error('请输入正确的昵称')
        return false
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return false
      }
      var params = new FormData()
      params.append('username', this.name)
      params.append('password', this.password)
      this.axios.post(process.env.API_ROOT + '/api/login/dologin', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          localStorage.setItem('sid', data.data.sid)
          this.$router.push('/home')
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  mounted () {
    var params = new FormData()
    params.append('sid', localStorage.getItem('sid'))
    this.axios.post(process.env.API_ROOT + '/api/transfer/websitename', params).then((res) => {
      document.title = res.data.data
    })
  },
  components: {
  }
}
</script>

<style lang="stylus">
#login
  position absolute
  height 100%
  width 100%
  background-size cover
  .login
    width 80%
    max-width 600px
    margin 0 auto
    .el-input
      margin-top 20px
    .el-button
      width 100%
      margin-top 20px
    .el-button+.el-button
      margin-left 0
  img
    display block
    width 120px
    margin 80px auto 50px
</style>
