<template>
  <div id="app">
    <keep-alive :include="dynamicLayout">
      <router-view />
    </keep-alive>

    <!-- <h1 class="iconfont icon-dianzan2">黑马头条</h1> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'appVue',
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {
    ...mapState(['dynamicLayout'])
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped></style>
