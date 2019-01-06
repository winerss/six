<template>
  <div id="jiedian">
    <div class="title">节点转账</div>
    <div class="content">
      <p class="tips">转账最低100起转,100的倍数。</p>
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="种子账户" required>
          <el-input v-model="childAcc"></el-input>
        </el-form-item>
        <el-form-item label="奖励账户" required>
          <el-input v-model="reward"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" required>
          <el-input v-model="type"></el-input>
        </el-form-item>
        <el-form-item label="接收节点" required>
          <el-input v-model="revice"></el-input>
        </el-form-item>
        <el-form-item label="转换数量" required>
          <el-input v-model="num"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" required>
          <el-input v-model="pass"></el-input>
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
