<template>
  <div>
    <van-cell
      :key="index"
      v-for="(item, index) in searchList"
      icon="search"
      @click="hancelClick(item)"
    >
      <template #title>
        <div v-html="HighItem(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '../../../api/Search'
// 引入lodash防抖
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: String
  },
  data() {
    return {
      searchList: []
    }
  },
  watch: {
    // 监听搜索内容的变化 --- 发送接口
    searchText: {
      // 防抖
      handler: debounce(function (value) {
        // console.log(value)
        this.getSearchSuggestion(value)
      }, 500),
      immediate: true // 第一次也要监听
    }
  },
  methods: {
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q)
      //   console.log(res)
      this.searchList = res.data.data.options
    },
    HighItem(value) {
      //   给关键字加高亮效果
      const reg = new RegExp(this.searchText, 'gi')
      return value.replace(
        reg,
        `<span style='color:red'>${this.searchText}</span>`
      )
    },
    // 搜索结果   -- 子组件把值给父组件 子传父 用$emit触发
    hancelClick(item) {
      //   console.log(item)
      this.$emit('onSearch', item)
    }
  }
}
</script>

<style lang="less" scoped></style>
