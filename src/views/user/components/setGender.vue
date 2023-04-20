<template>
  <div class="setgender">
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
    />
  </div>
</template>

<script>
import { setUserProfile } from '@/api/user'

export default {
  name: 'setGender',
  components: {},
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onConfirm(value, index) {
      try {
        await setUserProfile({ gender: index })
      } catch (e) {
        this.$toast('错误')
      }
      this.$emit('input', index)
      this.$emit('close')
      // Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log(index)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped></style>
