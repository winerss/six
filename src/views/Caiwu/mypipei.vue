<template>
  <div id="mypipei">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>匹配收割记录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="scale-img" @click="scale" v-show="scaleShow">
      <div class="scale-wrapper">
        <span>X</span>
        <img :src="photo" alt="">
      </div>
    </div>
    <div class="tips" v-show="popupVisible">
      <div class="wrapper">
        <img @click="scale" :src="photo" alt="">
        <div class="btn">
          <el-button style="float: left;" @click="cancel">取消</el-button>
          <el-button style="float: right" @click="confirm" type="primary">确认收款</el-button>
        </div>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      :row-class-name="tableRowClassName">
      <el-table-column
        property="father.self_nickname"
        label="主单发起人">
      </el-table-column>
      <el-table-column
        property="father.self_tel"
        label="电话">
      </el-table-column>
      <!-- <el-table-column
        property="father.amount"
        label="主单数量">
      </el-table-column> -->
      <el-table-column
        property="father.create_time"
        label="主单发起时间">
      </el-table-column>
      <el-table-column
        property="amount"
        label="匹配收割数量">
      </el-table-column>
      <el-table-column
        property="create_time"
        label="匹配日期">
      </el-table-column>
      <el-table-column
        property="status"
        label="操作"
        width="200px">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.status == '2'"
            style="float:left;"
            size="mini"
            type="primary"
            @click="look(scope.row.pic, scope.row.id)">查看付款凭证并确定收款</el-button>
          <!-- <el-button
            v-show="scope.row.status == '2'"
            size="mini"
            style="float:left;"
            type="primary"
            @click="confirm(scope.row.id)">确认收款</el-button> -->
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
      id: '',
      scaleShow: false,
      pages: 0
    }
  },
  methods: {
    scale () {
      this.scaleShow = !this.scaleShow
    },
    tableRowClassName ({row, rowIndex}) {
      console.log(row.status)
      if (row.status !== '1') {
        return 'warning-row'
      }
      return ''
    },
    handleSizeChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', val)
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
    look (url, id) {
      this.id = id
      this.popupVisible = true
      this.photo = 'http://www.hbxjw.com/' + url
      // this.photo = 'https://www.dadan299.com/' + url
    },
    handleCurrentChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', val)
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
    confirm () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', this.id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/ok_order', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          setTimeout(() => {
            window.location.reload()
          }, 500)
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
  .el-table .warning-row
    color: #f00
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
</style>
