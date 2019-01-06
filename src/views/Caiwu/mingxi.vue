<template>
  <div id="mingxi">
    <div class="title">提币明细</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        property="id"
        label="序号">
      </el-table-column>
      <el-table-column
        property="tibiNum"
        label="提币数量">
      </el-table-column>
      <el-table-column
        property="num"
        label="实发数量">
      </el-table-column>
      <el-table-column
        property="fear"
        label="矿工费">
      </el-table-column>
      <el-table-column
        property="status"
        label="提币状态">
      </el-table-column>
      <el-table-column
        property="date"
        label="申请日期">
      </el-table-column>
      <el-table-column
        property="conDate"
        label="确认时间">
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
      tableData: [{
        id: 1,
        tibiNum: 0.00,
        num: 0.00,
        fear: 12.50,
        status: '状态',
        date: '2016-05-02 0:00:33',
        conDate: '2016-05-02 0:00:33'
      }]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
#mingxi
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
