<template>
  <div id="denglu">
    <div class="title">登录密码修改</div>
    <div class="content">
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="安全密码">
          <el-input v-model="password" placeholder="请输入安全密码"></el-input>
        </el-form-item>
        <el-form-item label="新登录密码">
          <el-input v-model="newpsd" placeholder="请输入新登录密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新登录密码">
          <el-input v-model="renewpsd" placeholder="请输入确认新登录密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      renewpsd: '',
      newpsd: ''
    }
  },
  methods: {
    submitForm () {
      if (!this.password) {
        this.$message.error('请输入安全密码')
        return false
      }
      if (!this.renewpsd) {
        this.$message.error('请输入新登录密码"')
        return false
      }
      if (!this.newpsd) {
        this.$message.error('请输入确认新登录密码')
        return false
      }
      var params = new FormData()
      params.append('username', this.password)
      params.append('username', this.renewpsd)
      params.append('password', this.newpsd)
      this.axios.post(process.env.API_ROOT + '/api/login/dologin', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          this.$router.push('')
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
#denglu
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
