<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 搜索列表页面 -->
    <SearchResult :searchText="searchText" v-if="isShowResult"></SearchResult>
    <!-- 搜索建议页面  -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></SearchSuggestion>
    <!-- 搜索历史页面 -->
    <SearchHistory
      @onSearch="onSearch"
      @allDel="searchHistory = []"
      :searchHistory="searchHistory"
      v-else
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'

import { setLocal } from '@/store/index'
import { HISTROYKEY } from '@/constants'
import { getLocal } from '../../utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isShowResult: false,
      searchHistory: getLocal(HISTROYKEY) || [] // 搜索历史列表
    }
  },
  computed: {},
  created() {},
  watch: {
    // 搜索历史持久化
    // 坚挺了搜索历史记录数据的变化
    // 发生了变化的时候，把最新数据存到本地存储
    // 注意：获取默认值的时候，从本地存储获取数据
    searchHistory(val) {
      setLocal(HISTROYKEY, val)
    }
  },
  methods: {
    // 开始搜索
    onSearch(item) {
      // 拿到子组件给到的值 赋值给 搜索框 让搜索框显示搜索内容
      this.searchText = item
      this.isShowResult = true

      // 添加之前，，判断item是否已在搜索历史列表里面
      const index = this.searchHistory.indexOf(item) // index = -1 不存在
      if (index !== -1) {
        // 找到这项删除
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(item)
    },
    // 取消搜索
    onCancel() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped></style>
