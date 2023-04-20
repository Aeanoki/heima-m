<template>
  <div class="Home">
    <!-- 搜索 -->
    <van-nav-bar fixed>
      <van-button
        class="home-search"
        slot="title"
        round
        type="primary"
        icon="search"
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="heima-tabs" animated swipeable v-model="active">
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :channels="obj" />
      </van-tab>
      <div class="zhanwei" slot="nav-right"></div>
      <div class="gengduo" slot="nav-right" @click="showPopup">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      closeable
      :style="{ height: '87%' }"
    >
      <ChannelRdit
        :mycal="channels"
        :active="active"
        @changeMyList="changeMyChannelList"
      />
    </van-popup>
    <!-- <van-popup v-model="show">内容</van-popup> -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './component/articleList.vue'
import ChannelRdit from './component/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/localStorage'
export default {
  name: 'HomeHeima',
  components: {
    ArticleList,
    ChannelRdit
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels() {
      try {
        let arr = []
        // this.channels = data.data.channels
        if (this.user) {
          // 用户已登录
          const { data } = await getUserChannels()
          arr = data.data.channels
        } else {
          // 用户未登录
          const localStorage = getItem('USERTOKEN')
          if (localStorage) {
            arr = localStorage
          } else {
            console.log(111)
            const { data } = await getUserChannels()
            arr = data.data.channels
          }
        }

        this.channels = arr
        // console.log(this.channels)
      } catch (e) {
        this.$toast('加载错误')
      }
    },
    showPopup() {
      this.show = true
    },
    changeMyChannelList(index, show = true) {
      this.active = index
      this.show = show
    }
  },
  created() {
    this.loadChannels()
  },
  mounted() {}
}
</script>
<style scoped lang="less">
.Home {
  padding-bottom: 110px;
  padding-top: 110px;

  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .van-nav-bar {
    background-color: #3296fa;
  }

  .home-search {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    font-size: 28px;
    border: none;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.heima-tabs {
    .van-tabs__nav--line {
      height: 1.17333rem;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tabs__line {
      width: 30px;
      height: 6px;
      background-color: #3296fa;
    }
    .van-tab--active {
      color: #333;
    }
    .gengduo {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.9);
      i.iconfont {
        font-size: 33px;
      }
    }
    .gengduo:before {
      // display: flex;
      content: '';
      width: 2px;
      height: 100%;
      background-image: url(../../assets/gradient-gray-line.png);
      background-size: contain;
    }
    .zhanwei {
      // display: block;
      min-width: 41px;
      height: 82px;
    }
  }
}
</style>
