<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" class="leftBtn" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleList.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | relativeTime }}
          </div>
          <FollowUser
            :autId="articleList.aut_id"
            v-model="articleList.is_followed"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="content"
          v-html="articleList.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <CommentList
          :source="articleList.art_id"
          :list="commentList"
          @reply-click="onReplyClick"
        ></CommentList>
        <!-- 爷爷组件article/index.vue 监听自定事件，打开弹框，输出收到的数据 -->
        <!-- /评论列表 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleById"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <!-- v-if="articleList.art_id" -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="articleList.comm_count" color="#777" />
      <!-- 小星星组件 -->
      <CollectArticle
        :artId="articleList.aut_id"
        v-model="articleList.is_collected"
      ></CollectArticle>
      <!-- 点赞组件 -->
      <LikeArticle
        :artId="articleList.art_id"
        v-model="articleList.attitude"
      ></LikeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!------------------------ ------------------------发布评论---------------------------------- -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :target="articleList.art_id"
        @postSuccess="postSuccess"
      ></CommentPost>
    </van-popup>
    <!------------------------ ------------------------/发布评论---------------------------------- -->

    <!------------------------ 评论回复 ------------------------------>
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        :currentComment="currentComment"
        v-if="isReplyShow"
        @close="isReplyShow = false"
      ></CommentReply>
    </van-popup>
    <!------------------------ /评论回复 ------------------------------>
  </div>
</template>

<script>
import { getArticleById } from '@/api/HomeArticle'
// 引入github-markdown.css  样式
import 'github-markdown-css'
import { ImagePreview } from 'vant'
import FollowUser from './components/follow-user.vue'
import CollectArticle from './components/collect-article.vue'
import LikeArticle from './components/like-article.vue'
import CommentList from './components/components/comment-list.vue'
import CommentPost from './components/components/comment-post.vue'
import CommentReply from './components/components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  provide() {
    // 父组件提供文章的id
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      articleList: {},
      loading: false, // 文章加载状态
      isNotFound: false, // 标识当前是不是404状态
      isPostShow: false, // 发布评论弹层的标识
      commentList: [],
      isReplyShow: false, // 回复的弹出层
      currentComment: {} // 当前点击回复的评论项
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById()
  },
  mounted() {},
  methods: {
    previewImg() {
      // 获取所有的img图片
      // src属性
      // push到一个新数组里面
      console.log(this.$refs.content)
      const imgs = this.$refs.content.querySelectorAll('img')
      // 存储所有图片的路径
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.addEventListener('click', function () {
          ImagePreview({
            images: images,
            startPosition: index // 指定图片的起始位置，图片的index
          })
        })
      })
    },
    async getArticleById() {
      try {
        this.loading = true
        const res = await getArticleById(this.articleId)
        // console.log(res)
        this.articleList = res.data.data
        // 已经成功获取到了数据
        // 绑定图片预览功能 img图片
        this.loading = false
        // 界面更新之后执行的回调
        // 获取到最新的都没结构
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (e) {
        // console.log(e)
        this.loading = false
        // 判断是不是404状态
        this.isNotFound = e.response.status === 404
      }
    },

    // 评论关闭弹层
    postSuccess(data) {
      console.log(data)
      // 只需要修改父组件的commentList
      this.commentList.unshift(data)
      this.isPostShow = false
    },

    // 回复弹出层
    onReplyClick(comment) {
      console.log('弹出')
      this.currentComment = comment // 存储起来
      this.isReplyShow = true // 点击之后让弹层弹出
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .leftBtn {
    color: #fff;
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
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
