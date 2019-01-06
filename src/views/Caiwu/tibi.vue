<template>
  <div id="tibi">
    <div class="title">提币</div>
    <div class="content">
      <p class="tips">最低1000.00，1000.00倍数提币，矿工费0.00%。</p>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="奖励账户">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="提币数量" required="">
          <el-input v-model="num"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required="">
          <el-input v-model="pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交申请</el-button>
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
      num: '',
      pass: ''
    }
  },
  methods: {
    submitForm () {
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
#tibi
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
