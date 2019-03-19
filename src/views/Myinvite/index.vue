<template>
  <div id="myinvite">
    <div class="title">我的邀请</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row>
      <el-table-column
        label="序号"
        type="index">
      </el-table-column>
      <el-table-column
        property="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        property="user"
        label="邀请人">
        <template slot-scope="sope">
          {{invite}}
        </template>
      </el-table-column>
      <el-table-column
        property="create_time"
        label="注册日期">
      </el-table-column>
      <el-table-column
        property="is_use"
        label="状态">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.is_use == 0"
            @click="handleEdit(scope.$index, scope.row)">开通</el-button>
          <el-tag v-if="scope.row.is_use == 1" type="success">已开通</el-tag>
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
      tableData: [],
      pages: 0,
      invite: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', val)
      this.axios.post(process.env.API_ROOT + '/api/user/recmlists', params).then((res) => {
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
      this.axios.post(process.env.API_ROOT + '/api/user/recmlists', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        if (data.code === 1) {
          this.invite = data.data.nickname
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('page', 1)
      this.axios.post(process.env.API_ROOT + '/api/user/recmlists', params).then((res) => {
        console.log(res.data)
        let data = res.data
        if (data.code === 1) {
          this.tableData = data.data.data
          this.pages = Number(data.data.page) * 10
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleEdit (index, row) {
      this.$confirm('激活需要消耗一个激活码!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new FormData()
        params.append('sid', localStorage.getItem('sid'))
        params.append('userid', row.id)
        this.axios.post(process.env.API_ROOT + '/api/login/memberuse', params).then((res) => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
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
#myinvite
  .el-message-box
    max-width 420px
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
