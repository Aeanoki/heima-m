<template>
  <div class="setusername">
    <van-nav-bar
      class="nav-color"
      title="修改昵称"
      left-text="返回"
      right-text="确认"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-field
      class="pfide"
      v-model="message"
      rows="2"
      autosize
      round
      type="textarea"
      maxlength="8"
      placeholder="请输入昵称"
    />
  </div>
</template>

<script>
import { setUserProfile } from '@/api/user'

export default {
  name: 'setUserName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onClickRight() {
      try {
        await setUserProfile({ name: this.message })
      } catch (e) {
        this.$toast('修改昵称失败')
      }
      this.$emit('input', this.message)
      this.$emit('close')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped></style>
