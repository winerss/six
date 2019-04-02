<template>
  <div id="ziliao">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>资料修改</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form label-width="110px" class="demo-ruleForm">
        <el-form-item label="手机号码">
          <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="XRP提现地址">
          <el-input v-model="address" placeholder="请输入XRP提现地址"></el-input>
        </el-form-item>
        <el-form-item label="XRP提现Tag">
          <el-input v-model="money_tag" placeholder="请输入XRP提现Tag"></el-input>
        </el-form-item>
        <el-form-item label="开户行" v-if="other_pay_type == 1">
          <el-input type="text" v-model="bank" placeholder="请输入开户行名称"></el-input>
        </el-form-item>
        <el-form-item label="卡号" v-if="other_pay_type == 1">
          <el-input type="text" v-model="bank_address" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <div style="overflow:hidden;" v-if="other_pay_type == 1">
          <el-form-item label="支付宝收款码" class="img-one">
            <el-button class="upload" size="small" type="primary">
              点击上传
              <input class="selectImg" @change="upload($event, 1)" type="file" name="files" accept="image/*"/>
            </el-button>
            <div class="img-wrapper" v-show="zhi">
              <!-- <span class="close" @click="delImg(1)">X</span> -->
              <img :src=" 'http://www.hbxjw.com' + zhi" alt="">
            </div>
          </el-form-item>
          <el-form-item label="微信收款码" class="img-two">
            <el-button class="upload" size="small" type="primary">
              点击上传
              <input class="selectImg" @change="upload($event, 2)" type="file" name="files" accept="image/*"/>
            </el-button>
            <div class="img-wrapper" v-show="wei">
              <!-- <span class="close" @click="delImg(2)">X</span> -->
              <img :src="'http://www.hbxjw.com' + wei" alt="">
            </div>
          </el-form-item>
        </div>
        <el-form-item label="安全密钥" required>
          <el-input type="password" v-model="pass" placeholder="请输入安全密钥"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">确认修改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      address: '',
      money_tag: '',
      pass: '',
      zhi: '',
      zhifile: '',
      zhiname: '',
      wei: '',
      other_pay_type: 1,
      weifile: '',
      weiname: '',
      bank: '',
      bank_address: ''
    }
  },
  methods: {
    delImg (id) {
      if (id === 1) {
        this.zhi = ''
        this.zhifile = ''
        this.zhiname = ''
      } else {
        this.wei = ''
        this.weifile = ''
        this.weiname = ''
      }
    },
    upload (e, id) {
      let file = e.target.files[0]
      // 预览获取base64
      var _this = this
      var reader = new FileReader() // 新建FileReader对象
      reader.readAsDataURL(file) // 读取为base64
      reader.onloadend = function () {
        if (id === 1) {
          _this.zhi = this.result
        } else {
          _this.wei = this.result
        }
      }
      // 预览结束
      if (id === 1) {
        _this.zhifile = file
        _this.zhiname = file.name
      } else {
        _this.weifile = file
        _this.weiname = file.name
      }
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          console.log(data.data)
          this.phone = data.data.tel
          this.address = data.data.money_address
          this.money_tag = data.data.money_tag
          this.bank_address = data.data.bank_address
          this.bank = data.data.bank
          // let url = 'http://www.hbxjw.com'
          // let url = 'https://www.dadan299.com'
          this.zhi = data.data.alipay
          this.wei = data.data.weixin
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getmoney_tag () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/other_pay_type', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.other_pay_type = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    submitForm () {
      if (!this.phone) {
        this.$message.error('请输入手机号码')
        return false
      }
      let reg = /^[1][0-9]{10}$/
      if (!reg.test(this.phone)) {
        this.$message.error('请检查您的手机格式')
        return false
      }
      if (!this.address) {
        this.$message.error('请输入XRP提现地址')
        return false
      }
      if (!this.money_tag) {
        this.$message.error('请输入XRP提现Tag')
        return false
      }
      if (!this.pass) {
        this.$message.error('请输入密钥')
        return false
      }
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      var params = new FormData()
      params.append('tel', this.phone)
      params.append('money_address', this.address)
      params.append('money_tag', this.money_tag)
      params.append('erji', this.pass)
      params.append('bank', this.bank)
      params.append('bank_address', this.bank_address)
      params.append('sid', localStorage.getItem('sid'))
      params.append('file1', this.zhifile, this.zhiname)
      params.append('file2', this.weifile, this.weiname)
      this.axios.post(process.env.API_ROOT + '/api/user/edit_userinfo', params, config).then((res) => {
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
  mounted () {
    this.getmoney_tag()
    this.get_user_info()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#ziliao
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .el-form-item__label
    color #ccc
    text-align center
  .el-button
    display block
    margin 0 auto
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
    @media screen and (max-width:480px)
      padding 0
      background none
  .img-one,.img-two
    float left
    margin-right 30px
  .img-wrapper
    position relative
    width 100px
    height 100px
    margin-top 10px
    border-radius 4px
    padding 4px
    box-sizing border-box
    box-shadow 0px 0px 1px 2px rgba(255,255,255,.2)
    .close
      position absolute
      display inline-block
      right -10px
      top -10px
      width 20px
      height 20px
      border-radius 50%
      line-height 20px
      text-align center
      font-size 12px
      color #ccc
      background rgba(0,0,0,.6)
      cursor pointer
    img
      display block
      width 100%
      height 100%
  .upload
    position relative
    display inline-block
    .selectImg
      position: absolute;
      left 0
      top 0
      z-index 999
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      opacity: 0;
      filter: opacity(0)
</style>
