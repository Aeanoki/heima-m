<template>
  <div class="search-heima">
    <!-- 搜索栏 -->
    <form class="searchHM" action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="searchBool = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="searchBool" :searchLink="searchValue" />
    <!-- 搜索联想 -->
    <SearchLink
      v-else-if="searchValue"
      :searchLink="searchValue"
      @onSearch="onSearch"
    />
    <!-- 搜索历史 -->
    <SearchHistory v-else :searchHistory="searchHistory" />
    <!-- @setHistroy="setHistroy" -->
  </div>
</template>

<script>
import SearchHistory from './componets/search-history.vue'
import SearchLink from './componets/search-link.vue'
import SearchResult from './componets/search-result.vue'
import { setItem, getItem } from '@/utils/localStorage'

export default {
  name: 'searchHeima',
  components: {
    SearchHistory,
    SearchLink,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchBool: false,
      searchValue: '',
      searchHistory: getItem('SEARCHHISTORY') || []
    }
  },
  watch: {
    searchHistory(value) {
      setItem('SEARCHHISTORY', value)
    }
  },
  computed: {},

  methods: {
    onSearch(text) {
      this.searchValue = text
      const index = this.searchHistory.indexOf(text)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory = [text, ...this.searchHistory]
      console.log(this.searchHistory)

      // setItem('SEARCHHISTORY', this.searchHistory)
      this.searchBool = true
    },

    onCancel() {
      this.$router.back()
      // setHistroy(a, b) {
      //   this.searchHistory.splice(a, b)
      //   setItem('SEARCHHISTORY', this.searchHistory)
      // }
    },
    created() {},
    mounted() {}
  }
}
</script>
<style lang="less" scoped>
.search-heima {
  padding-top: 108px;
  .searchHM {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
