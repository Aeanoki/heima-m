<template>
  <div class="photo">
    <img ref="image" :src="imgs" class="img" />
    <div class="bottom-gj">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="ok" @click="upPhoto">确认</div>
    </div>
  </div>
</template>

<script>
import { setUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'userPhoto',
  components: {},
  props: {
    file: {
      // type: File,
      required: true
    }
  },
  data() {
    return {
      // 拿到文件的真实url
      imgs: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    // getCroppedCanvas() {
    //   // 这里为什么要用new promise
    //   return new Promise((resolve) => {
    //     this.cropper.getCroppedCanvas().toBlob((blob) => {
    //       // console.log(blob)
    //       resolve(blob)
    //     })
    //   })
    //   // console.log(asdfs)
    // },

    upPhoto() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })

      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // const file = await this.getCroppedCanvas()
        // console.log(file)
        // 如果后端接口要求Content-Type的之必须是multipart/form-data
        // 就必须new一个formdata对象
        const fd = new FormData()
        fd.append('photo', blob)
        console.log(fd)
        setUserPhoto(fd)

        this.$toast.success('成功')
        this.$emit('upphoto', window.URL.createObjectURL(blob))
        this.$emit('close')
      })
    }
  },

  created() {},
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>
<style lang="less" scoped>
.photo {
  background-color: black;
  height: 100%;
  .img {
    max-width: 100%;
    display: block;
  }
  .bottom-gj {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    font-size: 30px;
    color: white;

    div {
      width: 80px;
      height: 60px;
      flex: 1;
      display: flex;
      margin: 30px;
    }
    .cancel {
      justify-content: flex-start;
      align-items: center;
    }
    .ok {
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
