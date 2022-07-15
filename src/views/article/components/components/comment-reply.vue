<template>
  <div class="comment-reply">
    <van-nav-bar title="评论回复">
      <template #left>
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>

    <CommentItem :comment="currentComment"></CommentItem>

    <van-cell title="评论回复" :border="false"></van-cell>

    <CommentList
      type="c"
      :list="list"
      :source="currentComment.com_id"
    ></CommentList>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        @postSuccess="postSuccess"
        type="c"
        :target="currentComment.com_id"
      ></CommentPost>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    currentComment: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      isPostShow: false
    }
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postSuccess(comment) {
      // 关闭弹层
      this.isPostShow = false
      // 给输入框的内容渲染到页面上面
      this.list.unshift(comment)
      // 让回复的框框里 发表完评论之后 数字自增
      this.currentComment.reply_count++
    }
  }
}
</script>
<style scoped lang="less">
.van-nav-bar .van-icon {
  color: #fff;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
