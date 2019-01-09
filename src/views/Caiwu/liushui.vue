<template>
  <div id="caiwu">
    <div class="toolbar">
      <span class="title">我的流水</span>
      <el-radio v-model="radio" label="0">全部流水</el-radio>
      <el-radio v-model="radio" label="1">激活码流水</el-radio>
      <el-radio v-model="radio" label="2">大盘币流水</el-radio>
      <el-radio v-model="radio" label="3">排单币流水</el-radio>
      <el-button size="small" style="float: right;"  @click="search" type="primary">查询</el-button>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        label="昵称">
        <template slot-scope="sope">
          {{name}}
        </template>
      </el-table-column>
      <el-table-column
        property="create_time"
        label="日期">
      </el-table-column>
      <el-table-column
        property="account"
        label="改变金额">
      </el-table-column>
      <el-table-column
        property="c_account"
        label="余额">
      </el-table-column>
      <el-table-column
        property="note"
        label="备注">
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
      radio: '0',
      name: '',
      pages: 0,
      tableData: []
    }
  },
  methods: {
    search () {
      this.getData()
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.name = data.data.nickname
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleSizeChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', val)
      params.append('type', this.radio)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        console.log(res.data)
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
      params.append('type', this.radio)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        console.log(res.data)
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
      params.append('type', this.radio)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
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
    this.get_user_info()
    this.getData()
  },
  components: {
  }
}
</script>

<style lang="stylus">
#caiwu
  .toolbar
    font-size 24px
    background #fff
    padding 20px
    color #333
  .el-table
    margin 20px
  .el-pagination
    text-align right
    margin-right 20px
</style>
