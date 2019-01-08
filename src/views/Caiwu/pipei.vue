<template>
  <div id="pipei">
    <div class="title">排单匹配</div>
    <div class="tips" v-show="dialogVisible">
      <el-form label-width="84px">
        <el-form-item label="数量">
          <el-input v-model="num"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号">
          <el-input v-model="zhifu"></el-input>
        </el-form-item>
        <el-button style="float: right;margin-right: 10px;" @click="cancel">取消</el-button>
        <el-button style="float: right;margin-right: 10px;" @click="confirm" type="primary">确定</el-button>
      </el-form>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        property="self_nickname"
        label="排单人">
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
      <el-table-column
        property="is_use"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">匹配</el-button>
        </template>
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
      tableData: [],
      num: '',
      zhifu: '',
      dialogVisible: false,
      id: ''
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
      this.axios.post(process.env.API_ROOT + '/api/transfer/match_transfer', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    confirm () {
      this.dialogVisible = false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', this.id)
      params.append('amount', this.num)
      params.append('account', this.zhifu)
      this.axios.post(process.env.API_ROOT + '/api/transfer/match_transfer_action', params).then((res) => {
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
    handleEdit (index, row) {
      this.dialogVisible = true
      this.id = row.id
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
#pipei
  .tips
    position fixed
    width 40%
    z-index 999
    left 30%
    top 20%
    padding 40px
    background rgb(255, 255, 255)
    border-radius 8px;
    color #333
    .el-input__inner
      background-color #fff
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
