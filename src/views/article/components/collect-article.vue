<template>
  <van-button :loading="loading" @click="changeCollected">
    <template #icon>
      <van-icon
        :name="isCollected ? 'star' : 'star-o'"
        :color="isCollected ? 'red' : ''"
      />
    </template>
  </van-button>
</template>

<script>
import { deleteCollect, addCollect } from '@/api/HomeArticle'
export default {
  name: 'collectArticle',
  model: {
    prop: 'isCollected',
    event: 'changeCollected'
  },
  props: {
    isCollected: {
      type: Boolean
    },
    artId: {
      type: String
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async changeCollected() {
      try {
        this.loading = true
        if (this.isCollected) {
          // 已收藏，要取消收藏
          await deleteCollect(this.artId)
        } else {
          // 没有收藏，要添加收藏
          await addCollect(this.artId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('changeCollected', !this.isCollected)

        this.$toast.success(!this.isCollected ? '收藏成功' : '取消收藏')
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
