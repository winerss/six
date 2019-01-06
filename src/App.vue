<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
.el-table
  width inherit
.el-table th, .el-table tr
  background rgba(0,0,0,0.8) !important
  color #ccc
.el-table td, .el-table th.is-leaf
  border-bottom 1px solid rgba(255, 255, 255, .25)
.el-table--enable-row-hover .el-table__body tr:hover>td
  background rgba(0, 0, 0, 0.25)
.el-table--border::after, .el-table--group::after, .el-table::before
  background-color rgba(255, 255, 255, .25)
.el-dialog, .el-pager li
  background rgba(0, 0, 0, .25)
.el-pagination .btn-next, .el-pagination .btn-prev
  background rgba(0, 0, 0, .25)
.el-pagination button:disabled
  background rgba(0, 0, 0, .25)
.el-pagination .btn-next, .el-pagination .btn-prev
  color #ccc
.el-pager li.btn-quicknext, .el-pager li.btn-quickprev
  color #ccc
.el-pagination__jump
  color #ccc
.el-pager
  color #ccc
.el-input__inner
  background-color rgba(0, 0, 0, .25)
  color #ccc
  border 1px solid #333
</style>
