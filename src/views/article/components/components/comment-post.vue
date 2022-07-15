<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="message.length <= 0"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/Comment.js'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    type: {
      type: [Number, String],
      default: 'a'
    }
  },
  data() {
    return {
      message: ''
    }
  },
  // 子组件注入文章id，可以直接在当前组件使用
  inject: ['articleId'], // 文章的id
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      try {
        // loading效果
        this.$toast.loading({
          duration: 0, // 表示toast不会消失
          forbidClick: true // 禁用背景点击
        })
        const res = await addComment({
          target: this.target, // 评论目标id（评论文章即文章id，对评论进行回复则为评论id） 防止有大数字最好也执行一下toString方法！
          content: this.message, // 评论内容
          art_id: this.type === 'c' ? this.articleId : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })

        // 关弹层 通过自定义事件  通知父组件关闭弹层 通知父组件 更新评论
        this.$emit('postSuccess', res.data.data.new_obj)

        this.$toast.success('发布评论成功')
        // 清空输入框内容
        this.message = ''
        console.log(res)
      } catch (e) {
        this.$toast.fail('发布评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
