<template>
  <div class="setbirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onBirthday"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { setUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'setBirthday',
  components: {},
  props: {
    value: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
      // currentDates: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onBirthday() {
      const currentDates = dayjs(this.currentDate).format('YYYY-MM-DD')

      try {
        await setUserProfile({ birthday: currentDates })
      } catch (e) {
        this.$toast('修改失败')
      }
      this.$emit('input', currentDates)
      this.$emit('close')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped></style>
