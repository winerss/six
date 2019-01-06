<template>
  <div id="caiwu">
    <div class="title">我的流水</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        property="id"
        label="序号">
      </el-table-column>
      <el-table-column
        property="number"
        label="金粉编号">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期">
      </el-table-column>
      <el-table-column
        property="changeMoney"
        label="改变金额">
      </el-table-column>
      <el-table-column
        property="blanceMoney"
        label="余额">
      </el-table-column>
      <el-table-column
        property="reason"
        label="改变原因">
      </el-table-column>
      <el-table-column
        property="other"
        label="备注">
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
        number: '413237',
        date: '2016-05-02 0:00:33',
        changeMoney: '15.0000',
        blanceMoney: '463205.0000',
        reason: '奖金',
        other: '公司发放奖金'
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
#caiwu
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
