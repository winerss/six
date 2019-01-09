<template>
  <div id="denglu">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>登录密码修改</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form label-width="110px" class="demo-ruleForm">
        <el-form-item label="原密码">
          <el-input v-model="old_password" type="password" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新登录密码">
          <el-input v-model="newpsd" type="password" placeholder="请输入新登录密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新登录密码">
          <el-input v-model="renewpsd" type="password" placeholder="请输入确认新登录密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      renewpsd: '',
      newpsd: ''
    }
  },
  methods: {
    submitForm () {
      if (!this.old_password) {
        this.$message.error('请输入原密码')
        return false
      }
      if (!this.newpsd) {
        this.$message.error('请输入确认新登录密码')
        return false
      }
      if (!this.renewpsd) {
        this.$message.error('请输入新登录密码')
        return false
      }
      if (this.newpsd !== this.renewpsd) {
        this.$message.error('密码不一致')
        return false
      }
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('password', this.newpsd)
      params.append('old_password', this.old_password)
      params.append('type', 1)
      this.axios.post(process.env.API_ROOT + '/api/user/edit_password1', params).then((res) => {
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
#denglu
  .el-form-item__label
    color #ccc
  .el-button
    display block
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
