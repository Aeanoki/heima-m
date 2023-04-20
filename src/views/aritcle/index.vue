<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="articlesData.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articlesData.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articlesData.aut_photo"
          />
          <div slot="title" class="user-name">{{ articlesData.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articlesData.pubdate | today }}
          </div>
          <van-button
            v-if="articlesData.is_followed"
            :loading="followLoading"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            >取消关注</van-button
          >

          <van-button
            v-else
            :loading="followLoading"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          ref="article-content"
          v-html="articlesData.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区 -->
        <hmComment
          :source="articlesData.art_id"
          @onCommentNum="PLNum"
          :list="ctList"
        />
        <!-- 评论区 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isShow = true"
            >写评论</van-button
          >
          <!-- 评论数量 -->
          <van-icon name="comment-o" :badge="commentNumber" color="#777" />
          <!-- 评论数量 -->
          <collectArticles
            class="btn-item"
            :shoucangid="articlesData.art_id"
            :value="articlesData.is_collected"
            @shoucang="shoucang"
          />
          <van-icon
            color="#777"
            :name="articlesData.like_count === 0 ? 'good-job-o' : 'good-job'"
            @click="onGood"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论回复 -->
        <van-popup v-model="isShow" position="bottom">
          <CommentPost
            :target="articlesData.art_id"
            @post-success="postSuccess"
          />
        </van-popup>
        <!-- 评论回复 -->
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadWenZhang()"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticlesData, addGood, deleteGood } from '@/api/articles'
import '@/views/aritcle/github-markdown.css'
import { ImagePreview } from 'vant'
import { getUserFollow, deleteUserFollow } from '@/api/user'
import collectArticles from '@/components/articlecollect/index.vue'
import hmComment from '@/components/comments/index.vue'
import CommentPost from './comment/commentPost.vue'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 1
// })
export default {
  name: 'ArticleIndex',
  components: {
    collectArticles,
    hmComment,
    CommentPost,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    articleID: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      articlesData: {},
      status: 0,
      loading: true,
      followLoading: false,
      commentNumber: 0,
      isShow: false,
      ctList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle()
  },
  mounted() {},
  methods: {
    async loadArticle() {
      try {
        const { data } = await getArticlesData(this.articleID)
        // console.log(data.data.content)
        this.articlesData = data.data

        // 拿到dom元素
        setTimeout(() => {
          const articleIMG = this.$refs['article-content']
          const img = articleIMG.querySelectorAll('img')
          const imgs = []
          img.forEach((img, index) => {
            imgs.push(img.src)
            img.onclick = () => {
              ImagePreview({
                images: imgs,
                startPosition: index
              })
            }
            // img.addEventListener('click', function () {})
          })
          // console.log(imgs)
        }, 0)
      } catch (e) {
        if (e.response.status === 404) {
          this.status = 404
        }
        // console.dir(e)

        // this.$toast('加载失败')
      }
      this.loading = false
    },
    async onFollow() {
      this.followLoading = true
      try {
        if (this.articlesData.is_followed) {
          await deleteUserFollow(this.articlesData.aut_id)
          console.log(222)
        } else {
          await getUserFollow(this.articlesData.aut_id)
          console.log(111)
        }
        this.articlesData.is_followed = !this.articlesData.is_followed
        this.followLoading = false
      } catch (e) {
        if (e.response.status === 400) {
          this.$toast('不能关注自己')
        } else {
          this.$toast('erreo')
        }
      }
    },
    async onGood() {
      try {
        if (this.articlesData.like_count === 0) {
          await addGood(this.articlesData.art_id)
          this.articlesData.like_count = 1
        } else {
          await deleteGood(this.articlesData.art_id)
          this.articlesData.like_count = 0
        }
      } catch (e) {
        this.$toast('err')
      }
    },
    shoucang(val) {
      this.articlesData.is_collected = val
    },
    PLNum(num) {
      this.commentNumber = num
    },
    postSuccess(data) {
      console.log(data)
      this.isShow = false
      this.ctList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .van-nav-bar {
    background-color: #3377c4 !important;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    /deep/.van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  .markdown-body {
    font-size: 32px;
  }
}
</style>
