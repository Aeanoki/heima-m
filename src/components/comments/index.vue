<template>
  <van-list
    class="comment"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <ComList
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :index="index"
      @onred="onred"
    />
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/comment'
import ComList from './commentsItem/comList.vue'
export default {
  name: 'heimaComment',
  components: {
    ComList
  },
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // list: [],
      error: false,
      finished: false,
      loading: false,
      offset: null,
      limit: 10,
      commentList: this.list
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad() {
      try {
        // 获取评论数据
        const { data } = await getCommentList({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        this.$emit('onCommentNum', data.data.total_count)

        // 把评论添加到数组
        const { results } = data.data
        console.log(results)
        this.commentList.push(...results)

        // this.loading = false

        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        // this.loading = true
        console.log(data)
      } catch (e) {
        this.$toast('err')
      }
    },
    onred(index, bool) {
      console.log(this.commentList)
      if (bool) {
        this.commentList[index].like_count++
      } else {
        this.commentList[index].like_count--
      }
      this.commentList[index].is_liking = !this.commentList[index].is_liking
    }
  },
  created() {
    this.onLoad()
  },
  mounted() {}
}
</script>
<style lang="less" scoped></style>
