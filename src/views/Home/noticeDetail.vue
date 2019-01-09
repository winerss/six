<template>
  <div id="noticeDetail">
    <div class="title">合约资产</div>
    <div class="content">
      <h2>{{data.title}}</h2>
      <div class="content">{{data.content}}</div>
      <p class="date">{{data.date}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showLeft: true,
      data: {},
      id: ''
    }
  },
  methods: {
    get_record () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_record').then((res) => {
        res.data.data.forEach(element => {
          if (element.id === this.id) {
            this.data = element
          }
        })
      })
    }
  },
  components: {
  },
  mounted () {
    this.id = this.$route.params.id
    this.get_record()
  }
}
</script>

<style lang="stylus">
#noticeDetail
  .title
    font-size 24px
    padding 20px
    color #ccc
  .content
    padding 20px
    background #fff
    h2
      text-align center
      font-size 24px
    .date
      float right
</style>
