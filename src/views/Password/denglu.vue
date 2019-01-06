<template>
  <div id="denglu">
    <div class="title">登录密码修改</div>
    <div class="content">
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="安全密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="新登录密码">
          <el-input v-model="newpsd"></el-input>
        </el-form-item>
        <el-form-item label="确认新登录密码">
          <el-input v-model="renewpsd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      renewpsd: '',
      newpsd: ''
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
#denglu
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
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
</style>
