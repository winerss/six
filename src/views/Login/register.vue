<template>
  <div id="register">
    <div class="title">基本信息</div>
    <div class="content">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="金粉编号" required>
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="昵称" required>
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="邀请人编号" required>
          <el-input v-model="user"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" required>
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" required class="code-wrapper">
          <el-input v-model="code"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="登录密码" required>
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="安全密钥" required>
          <el-input type="password" v-model="pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认注册</el-button>
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
      user: '',
      phone: '',
      code: '',
      password: '',
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
#register
  .el-form-item__label
    color #ccc
  .title
    font-size 24px
    background rgba(0, 0, 0, .25)
    padding 20px
    color #ccc
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
    .code-wrapper
      .el-input
        width 80%
</style>
