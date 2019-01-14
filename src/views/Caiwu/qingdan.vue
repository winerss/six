<template>
  <div id="qingdan">
    <div class="title">贡献清单</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        property="id"
        label="序号">
      </el-table-column>
      <el-table-column
        property="invite"
        label="邀请奖">
      </el-table-column>
      <el-table-column
        property="reward"
        label="社群奖">
      </el-table-column>
      <el-table-column
        property="hasCoin"
        label="持币奖">
      </el-table-column>
      <el-table-column
        property="total"
        label="总计">
      </el-table-column>
      <el-table-column
        property="date"
        label="结算日期">
      </el-table-column>
      <el-table-column
        property="times"
        label="结算次数">
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
        invite: 0.00,
        reward: 0.00,
        hasCoin: 12.50,
        total: 12.50,
        date: '2016-05-02 0:00:33',
        times: '163'
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
#qingdan
  .title
    font-size 24px
    background #666
    padding 20px
    color #ccc
  .el-table
    margin 20px
    @media screen and (max-width:480px)
      margin 0
  .el-pagination
    text-align right
    margin-right 20px
</style>
