<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        @click="$router.push(`aritcle/${item.aut_id}`)"
      />
    </van-list>
  </div>
</template>

<script>
import { getsearchResult } from '@/api/search'
// import { setItem } from '@/utils/localStorage'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchLink: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
      // lookHistory: []
    }
  },
  // 加历史记录千万不能这么做，以下是错误代码
  watch: {
    // searchLink: {
    //   handler(value) {
    //     // 把搜索内容存入数组
    //     const i = value
    //     console.log(i)
    //     this.lookHistory = [...this.lookHistory, i]
    //     console.log(this.lookHistory)
    //     // 把搜索内容数组存入本地
    //     // setItem('LOOKHISTORY', this.lookHistory)
    //   },
    //   immediate: true
    // }
  },
  computed: {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getsearchResult({
          page: this.page,
          per_page: 20,
          q: this.searchLink
        })

        this.list.push(...data.data.results)
        this.loading = false
        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
        console.log(this.list)
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }
  },
  created() {
    // loadgetsearchResult()
  },
  mounted() {}
}
</script>
<style lang="less" scoped></style>
