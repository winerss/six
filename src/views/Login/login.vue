<template>
  <div id="login">
    <el-row>
      <el-col :span="20" :offset="2">
        <img src="../../assets/img/login.png" alt="">
        <input v-model="name" placeholder="请输入金粉编号"/>
        <input v-model="password" placeholder="请输入密码"/>
        <button @click="login">立即登录</button>
        <button>找回密码</button>
      </el-col>
    </el-row>
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
      this.$router.push('/home')
      // var params = new FormData()
      // params.append('username', this.form.name)
      // params.append('password', this.form.password)
      // this.axios.post(process.env.API_ROOT + '/api/login/dologin', params).then((res) => {
      //   let data = res.data
      //   this.$toast({
      //     message: data.msg,
      //     position: 'bottom',
      //     duration: 1000
      //   })
      //   if (res.data.code === 1) {
      //     localStorage.setItem('sid', data.data.sid)
      //     this.$router.push('/home')
      //   }
      // })
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
  input
    width 100%
    height 40px
    line-height 40px
    margin-top 20px
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
    background rgba(0, 0, 0, 0.6)
    border none
    outline none
    color #f5f5f5
    cursor pointer
  img
    display block
    width 120px
    margin 80px auto 50px
</style>
