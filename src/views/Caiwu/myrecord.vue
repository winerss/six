<template>
  <div id="myrecord">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>播种记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="scale-img" @click="scale" v-show="scaleShow">
      <div class="scale-wrapper">
        <span>X</span>
        <img :src="photo" alt="">
      </div>
    </div>
    <div class="tips" v-show="popupVisible">
      <div class="wrapper">
        <p style="text-align:center;padding-top: 20px;font-size: 16px;">点击图片放大</p>
        <img @click="scale" :src="photo" alt="">
        <div class="btn">
          <el-button style="float: left;" @click="cancel">取消</el-button>
          <el-button style="float: right" @click="cancel" type="primary">确定</el-button>
        </div>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      :row-class-name="tableRowClassName">
      <el-table-column width="20px" property="child" type="expand">
        <template slot-scope="props">
          <el-form v-for="(item, index) in props.row.child" :key="index" label-position="left" inline class="demo-table-expand">
            <el-form-item label="匹配人名称">
              <span>{{ item.self_nickname }}</span>
            </el-form-item>
            <el-form-item label="匹配人电话">
              <span>{{ item.self_tel }}</span>
            </el-form-item>
            <el-form-item label="匹配数量">
              <span>{{ item.amount }}</span>
            </el-form-item>
            <el-form-item label="匹配时间">
              <span>{{ item.create_time }}</span>
            </el-form-item>
            <br>
            <el-form-item>
              <el-popover
                placement="right"
                title="收款方式"
                width="300"
                trigger="click">
                <div class="text item">
                  <span class="my-label">钱包地址：</span>{{types[0].money_address}}
                </div>
                <div class="text item">
                  <span class="my-label">开户行：</span>{{types[1].bank}}
                </div>
                <div class="text item">
                  <span class="my-label">卡号：</span>{{types[1].bank_address}}
                </div>
                <div class="text item">
                  <span class="my-label">支付宝收款码：</span><br><img :src="types[2].alipay" alt="">
                </div>
                <div class="text item">
                  <span class="my-label">微信收款码：</span><br><img :src="types[3].weixin" alt="">
                </div>
                <el-button slot="reference" @click="getType(item.id)" size="small" type="primary" plain>收款账号</el-button>
              </el-popover>
            </el-form-item>
            <el-form-item>
              <!-- <el-button size="small" type="success"  v-clipboard:copy="item.account" v-clipboard:success="onCopy" class="copy">复制钱包地址</el-button> -->
              <el-button class="upload" v-show="item.status == '3'" size="small" type="primary">
                上传凭证
                <input class="selectImg" @change="upload($event, item.id)" type="file" name="files" accept="image/*"/>
              </el-button>
              <el-button @click="look(item.pic)" v-show="item.status == '2'" size="small" type="primary">查看凭证</el-button>
              <el-button class="upload" v-show="item.status == '2'" size="small" type="primary">
                重新上传凭证
                <input class="selectImg" @change="upload($event, item.id)" type="file" name="files" accept="image/*"/>
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        width="110">
        <template slot-scope="scope">
          <span style="font-size: 8px">查看凭证</span>
        </template>
      </el-table-column>
      <el-table-column
        property="amount"
        label="排单数量">
      </el-table-column>
      <el-table-column
        property="self_tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        property="matchmoney"
        label="已匹配数量">
      </el-table-column>
      <el-table-column
        property="restmoney"
        label="剩余数量">
      </el-table-column>
      <el-table-column
        property="create_time"
        label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next, jumper"
      :total="pages">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 1000,
      currentPage: 1,
      tableData: [],
      popupVisible: false,
      pages: 0,
      scaleShow: false,
      types: [{'money_address': ''}, {'bank': '', 'bank_address': ''}, {'alipay': ''}, {'wexin': ''}],
      photo: ''
    }
  },
  methods: {
    getType (id) {
      var params = new FormData()
      params.append('id', id)
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/paytype', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          let url = 'htts://www.hbxjw.com'
          // let url = 'https://www.dadan299.com'
          this.types[0].money_address = data.data[0].money_address
          this.types[1].bank = data.data[1].bank
          this.types[1].bank_address = data.data[1].bank_address
          this.types[2].alipay = url + data.data[2].alipay
          this.types[3].weixin = url + data.data[3].weixin
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    scale () {
      this.scaleShow = !this.scaleShow
    },
    onCopy: function (e) {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    onError: function (e) {
      this.$message.error('复制失败')
    },
    tableRowClassName ({row, rowIndex}) {
      // console.log(row)
      if (row.status !== '1') {
        return 'warning-row'
      }
      return ''
    },
    handleSizeChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_paidan', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleCurrentChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_paidan', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_paidan', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
          this.pages = Number(data.data.page) * 10
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    look (url) {
      console.log(url)
      this.popupVisible = true
      this.photo = 'http://www.hbxjw.com/' + url
      // this.photo = 'https://www.dadan299.com/' + url
    },
    cancel () {
      this.popupVisible = false
    },
    upload (e, id) {
      let file = e.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('sid', localStorage.getItem('sid'))
      param.append('id', id)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 添加请求头
      this.axios.post(process.env.API_ROOT + '/api/transfer/upload_order', param, config).then(response => {
        let data = response.data
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
    this.getData()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#myrecord
.el-popover
  line-height 24px
  .my-label
    display inline-block
    width 100px
    color #333
  img
    margin-left 100px
    margin-top -20px
    height 100px
    width 100px
  .el-table .warning-row
    color: #f00
  .el-table__expand-icon>.el-icon
    color #f00
    font-weight bold
  .scale-img
    position fixed
    z-index 10
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0,0,0,.6)
    text-align center
    .scale-wrapper
      position absolute
      height 500px
      width 500px
      background #fff
      border-radius 10px
      left 50%
      top 50%
      margin-top -250px
      margin-left -250px
      @media screen and (max-width:480px)
        width 90%
        left 5%
        margin-left 0
        height 500px
      span
        position absolute
        height 20px
        width 20px
        background #ccc
        border-radius 50%
        right -10px
        top -10px
        font-size 14px
        line-height 20px
        color #fff
      img
        max-height 100%
        height auto
        max-width 100%
        min-width 80%
  .tips
    position fixed
    top 0
    left 0
    z-index 9
    width 100%
    height 100%
    background rgba(0,0,0,.4)
    border-radius 8px;
    .wrapper
      position relative
      background #fff;
      height 400px
      width 80%
      max-width 400px;
      margin 100px auto
      border-radius 10px
      img
        display block
        margin 0 auto
        max-width 400px
        min-width 200px
      .scale
        width 100%
        max-height 100%
      .btn
        position absolute
        bottom 20px
        left 50%
        margin-left -100px
        width 200px
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .el-table
    margin 20px
    @media screen and (max-width:480px)
      margin 0
  .el-pagination
    text-align right
    margin-right 20px
  .upload
    position relative
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
  .el-table__expanded-cell
    @media screen and (max-width:480px)
      padding 0
    .el-form-item
      margin-bottom 0
      @media screen and (max-width:480px)
        margin 0
    .el-form-item__label, .el-form-item__content
      @media screen and (max-width:480px)
        line-height 20px
    .el-form
      @media screen and (max-width:480px)
        background #f5f5f5
        margin-top 0px
        padding 6px
</style>
