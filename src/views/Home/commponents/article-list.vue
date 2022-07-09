<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错啦，点击刷新~"
      >
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
        <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/HomeArticle.js'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshLoading: false,
      successText: null
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 获取文章列表数据
      try {
        const res = await getArticle({
          channel_id: this.channel.id, // 文章列表对应的频道id
          timestamp: this.timestamp || Date.now(), // 时间戳首次请求为当前时间戳
          with_top: 1 // 写死1
        })
        // 把拿到的数据赋值给list，[]里面是拼接内容，每次拿到的数据，拼接到下面或者上面
        this.list = [...this.list, ...res.data.data.results]
        this.loading = false
        //   console.log(res)

        // 数据已经请求完了
        if (res.data.data.results.length === 0) {
          // 如果数据请求完毕，finished设置为true
          this.finished = true
        } else {
          this.timestamp = res.data.data.pre_timestamp
        }
      } catch (e) {
        // 如果捕获到错误，error属性改为true 展示错误文字  点击重新加载数据
        // 同时loading=false 方便下一次load事件的触发
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const res = await getArticle({
          channel_id: this.channel.id, // 文章列表对应的频道id
          timestamp: this.timestamp || Date.now(), // 时间戳首次请求为当前时间戳
          with_top: 1 // 写死1
        })

        // 数据更新
        this.list = [...res.data.data.results, ...this.list]
        this.refreshLoading = false
        this.successText = `加载了${res.data.data.results.length}条数据`
      } catch (e) {
        this.refreshLoading = false
        this.$toast.fail('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
