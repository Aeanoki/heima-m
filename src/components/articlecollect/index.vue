<template>
  <van-button>
    <van-icon
      color="#777"
      :name="value ? 'star' : 'star-o'"
      :class="{
        collects: value
      }"
      @click="onStar"
    />
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/articles'

export default {
  name: 'collectActicle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    shoucangid: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    async onStar() {
      try {
        if (this.value) {
          await deleteCollect(this.shoucangid)
        } else {
          await addCollect(this.shoucangid)
        }
      } catch (e) {
        this.$toast('err')
      }
      // this.value = !this.value
      this.$emit('shoucang', !this.value)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.collects {
  color: rgb(242, 161, 22) !important;
}
</style>
