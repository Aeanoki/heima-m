<template>
  <div class="histroy">
    <van-cell>
      <span slot="title">搜索历史</span>
      <van-button
        type="warning"
        size="mini"
        @click="addList(0, historyList.length)"
        >全部删除</van-button
      >
    </van-cell>
    <van-cell v-for="(item, index) in historyList" :key="index">
      <span slot="title">{{ item }}</span>
      <van-icon name="close" @click="addList(index, 1)" />
    </van-cell>
  </div>
</template>

<script>
// import { getItem } from '@/utils/localStorage'

export default {
  name: 'searchHistroy',
  components: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      historyList: this.searchHistory
      // hisList: []
    }
  },
  watch: {
    // searchHistory: {
    //   handler() {
    //     setItem('SEARCHHISTORY', this.lookHistory)
    //     // this.loadLookHistory()
    //   },
    //   deep: true
    //   // immediate: true
    // }
  },
  computed: {},
  methods: {
    addList(a, b) {
      // this.historyList = this.searchHistory
      this.historyList.splice(a, b)
      // const hisList = getItem('SEARCHHISTORY')
      // this.historyList = hisList
    }
  },
  created() {
    // this.loadLookHistory()
  },
  mounted() {}
}
</script>
<style lang="less" scoped></style>
