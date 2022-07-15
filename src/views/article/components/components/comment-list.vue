<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="出错了，点击重复"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    ></CommentItem>
    <!-- 父组件comment-list.vue监听自定义事件，继续向外传递收到的数据（自定义事件） -->
    <!-- <van-cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
    ></van-cell> -->
  </van-list>
</template>
<script>
import { getComments } from '@/api/Comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [String, Number]
    },
    list: {
      type: Array
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      limit: 10, // 默认10条数据
      offset: null,
      error: false
    }
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // console.log(res)
        this.list.push(...res.data.data.results)

        // 请求到数据之后 把 loading改为false
        this.loading = false

        // 判断最后一条id和最新的一条的id是否相等
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true
        } else {
          this.offset = res.data.data.last_id
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
