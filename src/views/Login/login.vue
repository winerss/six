<template>
  <div id="login">
    <div class="login">
      <img src="../../assets/img/login.png" alt="">
      <input v-model="name" placeholder="请输入金粉编号"/>
      <input v-model="password" type="password" placeholder="请输入密码"/>
      <button @click="login">立即登录</button>
      <button>找回密码</button>
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
        this.$message.error('请输入正确的金粉编号')
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
          this.$router.push('/home')
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
#login
  position absolute
  height 100%
  width 100%
  background url('../../assets/img/loginbg.jpg')
  background-size cover
  .login
    width 80%
    max-width 600px
    margin 0 auto
  input
    width 98%
    height 40px
    line-height 40px
    margin-top 20px
    padding 0 1%
    border-radius 4px
    background none
    border 1px solid #ccc
    color #f5f5f5
  button
    width 100%
    height 40px
    line-height 40px
    padding 0
    margin-top 20px
    background rgba(0, 0, 0, 0.7)
    border none
    outline none
    color #f5f5f5
    cursor pointer
  img
    display block
    width 120px
    margin 80px auto 50px
</style>
