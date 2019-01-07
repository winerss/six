<template>
  <div id="jiedian">
    <div class="title">排单币转账</div>
    <div class="content">
      <p class="tips">排单币余额</p>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="接收用户昵称" required>
          <el-input v-model="host" placeholder="请输入接收用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="转换数量" required>
          <el-input v-model="num" placeholder="请输入转换数量"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required>
          <el-input v-model="pass" placeholder="请输入安全密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认转账</el-button>
        </el-form-item>
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
      params.append('type', 2)
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
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
#jiedian
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
    position relative
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 80px 40px
    .tips
      position absolute
      top 20px
      left 20px
      right 20px
      padding-bottom 10px
      border-bottom 1px solid #ccc
      color #ccc
      font-size 20px
</style>
