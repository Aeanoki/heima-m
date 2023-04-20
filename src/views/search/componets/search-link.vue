<template>
  <div class="link">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in searchLinks"
      :key="index"
      @click="$emit('onSearch', text)"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionList } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchLink',
  components: {},
  props: {
    searchLink: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchLinks: []
    }
  },
  watch: {
    searchLink: {
      // handler(value) {
      //   console.log(value)
      //   this.loadGetSuggestionList({ q: value })
      // },
      handler: debounce(function (value) {
        this.loadGetSuggestionList(value)
      }, 1000),
      immediate: true
    }
  },
  computed: {},
  methods: {
    async loadGetSuggestionList(q) {
      const { data } = await getSuggestionList(q)
      // console.log(data)
      this.searchLinks = data.data.options
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped></style>
