<template>
  <div class="cl-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="btn" round plain size="mini" @click="showDel">{{
        isClose ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item my-grid-item"
        v-for="(item, index) in mycal"
        :key="index"
        @click="clickChannel(item, index)"
      >
        <!-- 编辑x号图标 -->
        <van-icon
          slot="icon"
          name="close"
          v-show="isClose && item.id !== 0"
        ></van-icon>
        <!-- 编辑x号图标 -->

        <span slot="text" class="text" :class="{ active: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in loadAllChennelsList"
        :key="index"
        :text="item.name"
        @click="addMyChannel(item)"
      >
        <van-icon slot="icon" name="plus" v-show="isClose"></van-icon>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAlllChannels, addChannels, removeUserChannels } from '@/api/home'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'
export default {
  name: 'clEdit',
  components: {},
  props: {
    // 我的频道
    mycal: {
      type: Array,
      required: false
    },
    // 高亮显示
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChennelsList: [],
      myArr: this.mycal,
      isClose: false
    }
  },
  watch: {},
  computed: {
    loadAllChennelsList() {
      return this.allChennelsList.filter((item) => {
        return !this.mycal.find((items) => {
          return items.id === item.id
        })
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async loadAllChennels() {
      const { data } = await getAlllChannels()
      const { channels } = data.data
      console.log(channels)
      this.allChennelsList = channels
    },
    async addMyChannel(item) {
      this.myArr.push(item)

      if (this.user) {
        // 已登录存储
        try {
          await addChannels({
            id: item.id,
            seq: this.mycal.length
          })
        } catch (err) {
          this.$toast('数据上传失败')
        }
      } else {
        // 未登录存储
        setItem('NO_LOGIN_CHANNELS_LIST', this.mycal)
      }
      // console.log(item)
    },
    showDel() {
      this.isClose = !this.isClose
    },
    async clickChannel(item, index) {
      if (this.isClose) {
        if (this.active > index) {
          this.$emit('changeMyList', this.active - 1, true)
        }
        if (item.id === 0) {
          return
        }
        this.myArr.splice(index, 1)
        // 删除频道方法
        if (this.user) {
          // 已登录删除
          try {
            await removeUserChannels(item.id)
          } catch (err) {
            this.$toast('数据删除失败')
          }
        } else {
          // 未登录删除
          setItem('NO_LOGIN_CHANNELS_LIST', this.mycal)
        }
      } else {
        this.$emit('changeMyList', index, false)
      }
    }
  },
  created() {
    this.loadAllChennels()
  },
  mounted() {
    // console.log(this.loadAllChennelsList)
  }
}
</script>
<style lang="less" scoped>
.cl-edit {
  padding: 80px 0;

  .van-cell {
    align-items: center;
    .title-text {
      font-size: 33px;
    }
    .btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
      }
    }
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap;
      display: flex;
      // justify-content: center;
      .active {
        color: #f85959;
      }
    }
    .van-icon-plus {
      display: flex;
      font-size: 28px;
      margin-right: 6px;
    }
    .van-grid-item__text {
      margin: 0;
      padding: 0;
      // line-height: normal;
    }
  }
  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
  /deep/.my-grid-item {
    .van-icon-close {
      position: absolute;
      top: -10px;
      right: -15px;
      font-size: 20px;
    }
  }
}
</style>
