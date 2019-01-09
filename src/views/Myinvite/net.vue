<template>
  <div id="net">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (node) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('uid', node.id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/tree', params).then((res) => {
        let data = res.data.data
        let childArray = []
        data.forEach(element => {
          childArray.push({
            id: element.id,
            label: element.name,
            children: []
          })
        })
        node.children = childArray
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.data.push({
          id: res.data.data.id,
          label: res.data.data.nickname,
          children: []
        })
      })
    }
  },
  components: {
  },
  mounted () {
    this.get_user_info()
  }
}
</script>

<style lang="stylus">
#net
  .title
    padding 12px 20px
    color #ccc
    font-size 20px
    border-bottom 1px solid #ccc
    @media screen and (max-width:480px)
      padding 8px 10px
      font-size 14px
  .content
    background rgba(0, 0, 0, .25)
    margin 20px
    padding 40px
    @media screen and (max-width:480px)
      padding 0
      background none
</style>
