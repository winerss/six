<template>
  <div id="paidan">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>播撒种子</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <p class="tips">利息: {{data.lxn_scale * 100}}% 种子周期: {{data.zq_scale}}(天) 排单手续费{{data.sx_scale * 100}}%</p>
      <el-form label-width="80px" class="demo-ruleForm">
        <el-form-item label="发起数量" required>
          <el-input v-model="num" placeholder="请输入发起数量"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required>
          <el-input v-model="pass" type="password" placeholder="请输入安全密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">确认发起</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: '',
      pass: '',
      data: {}
    }
  },
  methods: {
    getData () {
      this.axios.post(process.env.API_ROOT + '/api/transfer/poundage').then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.data = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    submitForm () {
      if (!this.num) {
        this.$message.error('请输入转换数量')
        return false
      }
      if (!this.pass) {
        this.$message.error('请输入安全密码')
        return false
      }
      var params = new FormData()
      params.append('amount', this.num)
      params.append('erji', this.pass)
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/transfer/sale', params).then((res) => {
        let data = res.data
        console.log(res)
        if (data.code === 1) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/myrecord')
            localStorage.setItem('active', '8-3')
          }, 1000)
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  mounted () {
    this.getData()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#paidan
  .el-form-item__label
    color #333
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
    position relative
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 60px 40px
    @media screen and (max-width:480px)
      padding 40px 0
      background none
    .tips
      position absolute
      top 20px
      left 20px
      right 20px
      padding-bottom 10px
      border-bottom 1px solid #333
      color #333
      font-size 16px
      @media screen and (max-width:480px)
        top 0px
        left 0
        right 0
</style>
