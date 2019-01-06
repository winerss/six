<template>
  <div id="neibu">
    <div class="title">内部转账</div>
    <div class="content">
      <p class="tips">内部转账最低100起转,100的倍数。</p>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="认筹账户" required>
          <el-input v-model="account" placeholder="请输入认筹账户"></el-input>
        </el-form-item>
        <el-form-item label="种子账户" required>
          <el-input v-model="childAcc" placeholder="请输入种子账户"></el-input>
        </el-form-item>
        <el-form-item label="转账类型" required>
          <el-input v-model="type" placeholder="请输入转账类型"></el-input>
        </el-form-item>
        <el-form-item label="转换数量" required>
          <el-input v-model="num" placeholder="请输入转换数量"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required>
          <el-input v-model="pass" type="password" placeholder="请输入安全密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认转换</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      childAcc: '',
      type: '',
      num: '',
      pass: ''
    }
  },
  methods: {
    submitForm () {
      if (!this.account) {
        this.$message.error('请输入认筹账户')
        return false
      }
      if (!this.childAcc) {
        this.$message.error('请输入种子账户')
        return false
      }
      if (!this.type) {
        this.$message.error('请输入转账类型')
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
      params.append('username', this.account)
      params.append('username', this.childAcc)
      params.append('password', this.type)
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
#neibu
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
