<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{ active: comment.is_liking }"
        :icon="this.comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onCommentLike"
        :loading="loading"
      >
        {{ comment.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}</van-button
        >
        <!-- comment-item.vue组件里面给回复按钮绑定事件，触发向外传递点击行数据（自定义事件） -->
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deleteCommentLike, addCommentLike } from '@/api/Comment.js'
export default {
  name: 'CommentItem',
  props: {
    // 每行的评论信息
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCommentLike() {
      try {
        // 判断当前小图标是否呈现什么状态
        // 如果已经点赞 -- -去取消
        // 如果是取消 ---- 去点赞
        this.loading = true
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }

        // 把点赞状态取反
        this.comment.is_liking = !this.comment.is_liking

        //   提示
        this.$toast('操作成功~')
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .like-btn {
    &.active {
      .van-icon {
        color: red;
      }
    }
  }
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .liked {
    background-color: orange;
  }
}
</style>
