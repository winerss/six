<template>
  <div id="myrecord">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的排单记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tips" v-show="popupVisible">
      <div class="wrapper">
        <img :src="photo" alt="">
        <div class="btn">
          <el-button style="float: left;" @click="cancel">取消</el-button>
          <el-button style="float: right" @click="cancel" type="primary">确定</el-button>
        </div>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column property="child" type="expand">
        <template slot-scope="props">
          <el-form v-for="(item, index) in props.row.child" :key="index" label-position="left" inline class="demo-table-expand">
            <el-form-item label="匹配人名称">
              <span>{{ item.self_nickname }}</span>
            </el-form-item>
            <el-form-item label="匹配数量">
              <span>{{ item.amount }}</span>
            </el-form-item>
            <el-form-item label="匹配时间">
              <span>{{ item.create_time }}</span>
            </el-form-item>
            <el-form-item label="收款账号(支付宝)">
              <span>{{ item.account }}</span>
            </el-form-item>
            <el-form-item>
              <el-button class="upload" v-show="item.status == '3'" size="small" type="primary">
                上传付款凭证
                <input class="selectImg" @change="upload($event, item.id)" type="file" name="files" accept="image/*"/>
              </el-button>
              <el-button @click="look(item.pic)" v-show="item.status == '2'" size="small" type="primary">查看付款凭证</el-button>
              <el-button class="upload" v-show="item.status == '2'" size="small" type="primary">
                重新上传付款凭证
                <input class="selectImg" @change="upload($event, item.id)" type="file" name="files" accept="image/*"/>
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        property="amount"
        label="排单数量">
      </el-table-column>
      <el-table-column
        property="matchmoney"
        label="已匹配数量">
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
      photo: ''
    }
  },
  methods: {
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
      this.photo = 'https://www.dadan299.com/' + url
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
  .tips
    position fixed
    top 0
    left 0
    z-index 9999
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
        min-width 30%
        max-width 80%
        padding-top 20px
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
      @media screen and (max-width:480px)
        margin 0
    .el-form-item__label, .el-form-item__content
      @media screen and (max-width:480px)
        line-height 20px
    .el-form
      @media screen and (max-width:480px)
        background #ccc
        margin-top 20px
        padding 6px
</style>
