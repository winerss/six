<template>
  <div id="jiedian">
    <div class="title">节点转账</div>
    <div class="content">
      <p class="tips">转账最低100起转,100的倍数。</p>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="种子账户" required>
          <el-input v-model="childAcc" placeholder="请输入种子账户"></el-input>
        </el-form-item>
        <el-form-item label="奖励账户" required>
          <el-input v-model="reward" placeholder="请输入奖励账户"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" required>
          <el-input v-model="type" placeholder="请输入账户类型"></el-input>
        </el-form-item>
        <el-form-item label="接收节点" required>
          <el-input v-model="revice" placeholder="请输入接收节点"></el-input>
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
      reward: '',
      childAcc: '',
      type: '',
      revice: '',
      num: '',
      pass: ''
    }
  },
  methods: {
    submitForm () {
      if (!this.childAcc) {
        this.$message.error('请输入种子账户')
        return false
      }
      if (!this.reward) {
        this.$message.error('请输入种子账户')
        return false
      }
      if (!this.type) {
        this.$message.error('请输入转账类型')
        return false
      }
      if (!this.revice) {
        this.$message.error('请输入接收节点')
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
      params.append('username', this.childAcc)
      params.append('username', this.reward)
      params.append('password', this.type)
      params.append('password', this.revice)
      params.append('username', this.num)
      params.append('password', this.pass)
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
