<template>
  <div class="My">
    <!-- 已登录 -->
    <div v-if="user" class="header login_ok">
      <div class="tou_xiang">
        <div class="left">
          <van-image round class="img_touxiang" :src="userInfo.photo" />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            style="width: 70px"
            size="mini"
            color="#7232dd"
            round
            type="info"
            to="/user/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="nva">
        <div class="btn">
          <div class="text">{{ userInfo.art_count }}</div>
          <span>头条</span>
        </div>
        <div class="btn">
          <div class="text">{{ userInfo.follow_count }}</div>
          <span>关注</span>
        </div>
        <div class="btn">
          <div class="text">{{ userInfo.fans_count }}</div>
          <span>粉丝</span>
        </div>
        <div class="btn">
          <div class="text">{{ userInfo.like_count }}</div>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header">
      <div class="login" @click="$router.push({ name: 'login' })">
        <img src="@/assets/mobile.png" alt="" srcset="" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 收藏 -->
    <div class="nav-grid">
      <van-grid :column-num="2">
        <van-grid-item>
          <i slot="icon" class="iconfont icon-shoucang"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot="icon" class="iconfont icon-lishi"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="nav-btn">
      <van-nav-bar>
        <span slot="left" class="text">消息通知</span>
        <i slot="right" class="iconfont icon-arrow-right"></i>
      </van-nav-bar>
      <van-nav-bar>
        <span slot="left" class="text">小智同学</span>
        <i slot="right" class="iconfont icon-arrow-right"></i>
      </van-nav-bar>
    </div>
    <!-- 退出 -->
    <div v-if="user" class="downlogin">
      <van-nav-bar>
        <span slot="title" @click="loginout">退出登录</span>
      </van-nav-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyHeima',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  watch: {},
  computed: {
    ...mapState(['user'])
  },
  methods: {
    loginout() {
      this.$dialog
        .confirm({
          title: '要退出登录吗？'
        })
        .then(() => {
          // on confirm
          this.$store.state.user = null
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUser() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (err) {
        this.$toast('错误')
        console.log(err)
      }
    }
  },
  created() {
    if (this.user) {
      this.loadUser()
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.van-nav-bar {
  background: rgb(255, 255, 255);
}
.My {
  .header {
    height: 361px;
    background: url('@/assets/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    .login {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: azure;
      }
    }
  }
  .login_ok {
    display: block;
    .tou_xiang {
      height: 230px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      // background-color: skyblue;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .img_touxiang {
          width: 132px;
          height: 132px;
        }
        span {
          color: white;
          margin-left: 20px;
          font-size: 36px;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
    }
    .nva {
      // background-color: rosybrown;
      display: flex;
      .btn {
        height: 131px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        .text {
          font-size: 32px;
        }
        span {
          font-size: 28px;
        }
      }
    }
  }
  .nav-grid {
    .iconfont {
      font-size: 44px;
    }
    .icon-shoucang {
      color: rgb(235, 93, 38);
    }
    .icon-lishi {
      color: rgb(189, 78, 232);
    }
    span {
      font-size: 38px;
    }
  }
  .nav-btn {
    margin-top: 10px;
    margin-bottom: 10px;
    .text {
      color: rgb(0, 0, 0);
      font-size: 32px;
    }
    .iconfont {
      color: rgb(0, 0, 0);
    }
  }
  .downlogin {
    span {
      color: rgb(221, 81, 38);
    }
  }
}
</style>
