<template>
  <div id="tibi">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>提币</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form label-width="80px" class="demo-ruleForm">
        <el-form-item label="奖励账户">
          <el-input v-model="nickname" disabled placeholder="请输入奖励账户"></el-input>
        </el-form-item>
        <el-form-item label="提币数量" required="">
          <el-input v-model="num" placeholder="请输入提币数量"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required="">
          <el-input v-model="pass" type="password" placeholder="请输入安全密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">提交申请</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      num: '',
      pass: '',
      nickname: ''
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.nickname = data.data.nickname
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    submitForm () {
      if (!this.num) {
        this.$message.error('请输入提币数量')
        return false
      }
      if (!this.pass) {
        this.$message.error('请输入安全密码')
        return false
      }
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('amount', this.num)
      params.append('erji', this.pass)
      this.axios.post(process.env.API_ROOT + '/api/transfer/change_cash', params).then((res) => {
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
#tibi
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
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
    @media screen and (max-width:480px)
      padding 0
      background none
</style>
