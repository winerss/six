<template>
  <div id="ziliao">
    <div class="title">合约资产</div>
    <div class="content">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="金粉编号">
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="钱包地址">
          <el-input v-model="address"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥" required>
          <el-input type="password" v-model="pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number: '',
      name: '',
      phone: '',
      address: '',
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
#ziliao
  .el-form-item__label
    color #ccc
  .el-button
    display block
  .title
    font-size 24px
    background #666
    padding 20px
    color #ccc
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
</style>
