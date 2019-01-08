<template>
  <div id="myrecord">
    <div class="title">我的排单记录</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
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
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 1000,
      currentPage: 1,
      tableData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/self_paidan', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data
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
  .title
    font-size 24px
    background rgba(0, 0, 0, .25)
    padding 20px
    color #ccc
  .el-table
    margin 20px
  .el-pagination
    text-align right
    margin-right 20px
</style>
