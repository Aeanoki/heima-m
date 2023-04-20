<template>
  <div class="LayoutIndex">
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>主页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video"
        ><i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/wenda"
        ><i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/my"
        ><i slot="icon" class="iconfont icon-wode"></i>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data() {
    return {
      active: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(['addLayo'])
  },
  created() {},
  mounted() {
    this.$store.commit('addLayo', 'LayoutIndex') // 添加组件缓存
  }
}
</script>
<style lang="less" scoped>
.iconfont {
  font-size: 40px;
}
</style>
