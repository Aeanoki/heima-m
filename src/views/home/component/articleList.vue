<template>
  <div class="ArticleList">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="success">
      <van-list v-model="loading" :finished="finished" :error.sync="error" error-text="请求失败，点击重新加载" finished-text="没有更多了"
        @load="onLoad">
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <Aritcle v-for="(item, index) in list" :key="index" :aritcle="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'
import Aritcle from '@/components/article/index.vue'
// import { json } from 'body-parser'
export default {
  name: 'ArticleList',
  components: {
    Aritcle
  },
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // articleData: [],
      list: [],
      loading: false, // 控制加载转圈圈状态
      finished: false, // 控制加载结束状态
      timestamp: null, // 储存时间戳
      error: false, // 控制错误提示
      isLoading: false, // 控制下拉刷新的加载状态
      success: '刷新成功' // 刷新成功提示
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now()
        })
        this.list.push(...data.data.results)
        // JSON.parse('asdadadadas')
        // console.log(data)
        this.loading = false
        if (data.data.results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now()
        })
        this.list.unshift(...data.data.results)
        this.isLoading = false
        this.success = '刷新成功'
      } catch (e) {
        this.isLoading = false
        this.success = '刷新失败'
        // console.log('shibai')
      }
    }
  },
  created() { },
  mounted() { }
}
</script>
<style lang="less" scoped>
.ArticleList {
  height: 82vh;
  overflow-y: auto;
}
</style>
