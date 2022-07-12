<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isHistorySearch">
          <van-tag type="danger" class="allDel" @click="allDel"
            >全部删除</van-tag
          >
          <van-tag
            type="success"
            class="allDel"
            @click="isHistorySearch = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          name="delete"
          v-else
          @click="isHistorySearch = true"
        ></van-icon>
      </template>
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="clickHistoryItem(item, index)"
    >
      <template #default>
        <van-icon name="clear" v-if="isHistorySearch" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      Array
    }
  },
  data() {
    return {
      isHistorySearch: false
    }
  },

  methods: {
    // 全部删除
    allDel() {
      // 通过自定义事件，让父组件进行删除操作
      this.$emit('allDel')
    },
    // icon点击事件
    clickHistoryItem(item, index) {
      // 点击里历史项的时候，需要添加判断
      // 如果属于删除状态，点击就是删除当前项
      // 如果不处于删除状态，点击去搜索
      if (this.isHistorySearch) {
        // 删除
        this.searchHistory.splice(index, 1)
      } else {
        // 去搜索  自定义事件 让父组件跳转
        this.$emit('onSearch', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.allDel {
  margin-right: 10px;
}
</style>
