<template>
  <div id="mypipei">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我匹配的排单记录</el-breadcrumb-item>
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
      <el-table-column
        property="father.self_nickname"
        label="主单发起人">
      </el-table-column>
      <el-table-column
        property="father.self_tel"
        label="电话">
      </el-table-column>
      <el-table-column
        property="father.amount"
        label="主单数量">
      </el-table-column>
      <el-table-column
        property="father.create_time"
        label="主单发起时间">
      </el-table-column>
      <el-table-column
        property="amount"
        label="我匹配的数量">
      </el-table-column>
      <el-table-column
        property="create_time"
        label="匹配日期">
      </el-table-column>
      <el-table-column
        property="account"
        label="收款账号">
      </el-table-column>
      <el-table-column
        property="status"
        label="操作"
        width="300px">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.status == '2'"
            style="float:left;"
            size="mini"
            type="primary"
            @click="look(scope.row.pic)">查看付款凭证</el-button>
          <el-button
            v-show="scope.row.status == '2'"
            size="mini"
            style="float:left;"
            type="primary"
            @click="confirm(scope.row.id)">确认收款</el-button>
        </template>
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
      popupVisible: false,
      tableData: [],
      photo: '',
      pages: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_pipei', params).then((res) => {
        console.log(res)
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    cancel () {
      this.popupVisible = false
    },
    look (url) {
      console.log(url)
      this.popupVisible = true
      this.photo = 'https://www.dadan299.com/' + url
    },
    handleCurrentChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_pipei', params).then((res) => {
        console.log(res)
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    confirm (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/ok_order', params).then((res) => {
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
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_pipei', params).then((res) => {
        console.log(res)
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
          this.pages = Number(data.data.page) * 10
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
#mypipei
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
    @media screen and (max-width:480px)
      margin 0
  .el-pagination
    text-align right
    margin-right 20px
</style>
