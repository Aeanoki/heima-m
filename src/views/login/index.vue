<template>
  <div class="login-container">
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="登录"
      @click-left="$router.back()"
    />
    <van-form @submit="onSubmit" ref="fromdata">
      <van-field
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        left-icon="music-o"
        v-model="user.mobile"
        :rules="userPath.mobile"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        type="number"
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userPath.code"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 6"
            v-if="daojishi"
            format="ss s"
            @finish="daojishi = false"
          />
          <van-button
            v-else
            class="send-sms"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSMS } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 限定输入内容
      userPath: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|6|7|8|9]\d{9}$/, message: '请输入正确内容' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确内容' }
        ]
      },
      daojishi: false
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['removeLay']),
    async onSubmit() {
      const user = this.user

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 验证登录信息
      try {
        const { data } = await login(user)
        this.$store.commit('xguser', data.data)
        console.log('ok', data)
        this.$toast.success('登录成功')
        this.$store.commit('removeLay', 'LayoutIndex')

        this.$router.push({ name: 'my' })
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败，验证码或手机错误')
          this.$toast.fail('登录失败，验证码或手机错误')
        } else {
          console.log('登录失败，请稍后重试')
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms() {
      // 验证手机号
      try {
        await this.$refs.fromdata.validate('mobile')
        this.daojishi = true
      } catch (err) {
        return console.log('验证失败，请检查手机号', err)
      }
      // 验证短信是否发送成功
      try {
        await sendSMS(this.user.mobile)
      } catch (e) {
        this.daojishi = false
        console.log('短信发送失败', e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .van-nav-bar {
    background: rgb(52, 95, 225);
  }
  .iconfont {
    font-size: 37px;
  }
  .send-sms {
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
  }
}
</style>
