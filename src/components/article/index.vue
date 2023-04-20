<template>
  <!-- title="单元格" value="内容" label="描述信息" -->
  <van-cell class="aritcle" :to="`/aritcle/${aritcle.art_id}`">
    <div slot="title" class="text van-multi-ellipsis--l2">
      {{ aritcle.title }}
    </div>
    <div slot="label" class="label">
      <div class="image" v-if="aritcle.cover.type === 3">
        <van-image v-for="(img, index) in aritcle.cover.images" :key="index" fit="cover" :src="img" />
        <!-- 6666666 -->
      </div>
      <span>{{ aritcle.aut_name }} </span>
      <span>{{ aritcle.comm_count }}评论 </span>
      <span>{{ aritcle.pubdate | today }}</span>
    </div>
    <van-image v-if="aritcle.cover.type === 1" slot="default" fit="cover" :src="aritcle.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'aritcleName',
  components: {},
  props: {
    aritcle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created() { },
  mounted() { }
}
</script>
<style lang="less" scoped>
.van-cell__value {
  flex: unset;
  width: 232px;
  height: 146px;
}

.image {
  display: flex;
  justify-content: space-evenly;
  height: 146px;
  margin: 29px 0 31px;

  .van-image {
    width: 220px;
  }
}

.text {
  font-size: 36px;
}

.label {
  span {
    margin-right: 20px;
  }
}
</style>
