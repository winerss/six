<template>
  <div id="mingxi">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>提币明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        property="amount"
        label="提币数量">
      </el-table-column>
      <el-table-column
        property="time"
        label="提币时间">
      </el-table-column>
      <el-table-column
        property="deal_time"
        label="处理时间">
      </el-table-column>
      <el-table-column
        property="status"
        label="状态">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.status == 0"
            >未处理</el-button>
          <el-tag v-if="scope.row.status == 1" type="success">已处理</el-tag>
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
      pages: 0,
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', val)
      this.axios.post(process.env.API_ROOT + '/api/user/tibi', params).then((res) => {
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
      params.append('page', val)
      this.axios.post(process.env.API_ROOT + '/api/user/tibi', params).then((res) => {
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
      this.axios.post(process.env.API_ROOT + '/api/user/tibi', params).then((res) => {
        console.log(res.data)
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
#mingxi
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
