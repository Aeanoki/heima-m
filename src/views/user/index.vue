<template>
  <div class="user">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="show = true" />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '女' : '男'"
      @click="gendershow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="birthdayshow = true"
    />

    <!-- 编辑头像 -->

    <input type="file" hidden ref="file" @change="newfile" />
    <van-popup
      v-model="photoshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <setPhoto
        v-if="photoshow"
        @close="photoshow = false"
        :file="imgs"
        @upphoto="user.photo = $event"
      />
    </van-popup>

    <!-- 编辑头像 -->

    <!-- 编辑昵称 -->
    <van-popup v-model="show" position="top" :style="{ height: '30%' }">
      <setUserNameVue @close="show = false" v-model="user.name" v-if="show" />
    </van-popup>
    <!-- 编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup v-model="gendershow" position="bottom">
      <setGender
        v-if="gendershow"
        @close="gendershow = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup v-model="birthdayshow" position="bottom">
      <setBirthday
        v-if="birthdayshow"
        @close="birthdayshow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- 编辑生日 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import setUserNameVue from './components/setUserName.vue'
import setGender from './components/setGender.vue'
import setBirthday from './components/setBirthday.vue'
import setPhoto from './components/setPhoto.vue'

export default {
  name: 'user-profile',
  components: {
    setUserNameVue,
    setGender,
    setBirthday,
    setPhoto
  },
  props: {},
  data() {
    return {
      user: [],
      show: false,
      gendershow: false,
      birthdayshow: false,
      photoshow: false,
      imgs: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 获取用户资料
    async loadgetUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (e) {
        this.$toast('获取数据失败')
      }
    },
    newfile() {
      const data = this.$refs.file.files[0]
      this.imgs = data
      // console.log(this.$refs.file.value)
      this.photoshow = true
      this.$refs.file.value = ''
    }
  },
  created() {
    this.loadgetUserProfile()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.user {
  .van-nav-bar {
    background-color: #1f7ae9;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f2f2f2;
  }
}
</style>
