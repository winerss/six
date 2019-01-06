<template>
  <div id="lianjie">
    <div class="title">合约资产</div>
    <div class="content">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="邀请链接">
          <a href="http://www.wglcoin.com/member/userreg.aspx?t=413237">http://www.wglcoin.com/member/userreg.aspx?t=413237</a>
        </el-form-item>
        <el-form-item label="二维码">
          <img src="../../assets/img/erweima.png" alt="">
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus">
#lianjie
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
    a
      color #fff
    img
      height 200px
      width 200px
</style>
