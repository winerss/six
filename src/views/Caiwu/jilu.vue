<template>
  <div id="jilu">
    <div class="title">转账记录</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        property="id"
        label="序号">
      </el-table-column>
      <el-table-column
        property="account"
        label="账号">
      </el-table-column>
      <el-table-column
        property="num"
        label="数量">
      </el-table-column>
      <el-table-column
        property="type"
        label="类型">
      </el-table-column>
      <el-table-column
        property="others"
        label="备注">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期">
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
        account: 4512,
        num: 0.00,
        fear: 12.50,
        type: '转出转入',
        others: '转出种子账户到g234567',
        date: '2016-05-02 0:00:33'
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
#jilu
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
