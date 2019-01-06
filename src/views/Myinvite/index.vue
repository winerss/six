<template>
  <div id="myinvite">
    <div class="title">我的邀请</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        property="id"
        label="序号">
      </el-table-column>
      <el-table-column
        property="number"
        label="金粉编号">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        property="user"
        label="邀请人">
      </el-table-column>
      <el-table-column
        property="date"
        label="注册日期">
      </el-table-column>
      <el-table-column
        property="status"
        label="状态">
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
        name: 'winerss',
        user: '1456',
        date: '2016-05-02 0:00:33',
        status: '已开通'
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
#myinvite
  .title
    font-size 24px
    background #666
    padding 20px
    color #ccc
  .el-table
    margin 20px
  .el-pagination
    text-align right
    margin-right 20px
</style>
