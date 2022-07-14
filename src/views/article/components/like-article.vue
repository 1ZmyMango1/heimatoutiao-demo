<template>
  <div>
    <van-button @click="changeLike" :loading="loading">
      <template #icon>
        <van-icon
          :color="isAttitude === 1 ? 'red' : ''"
          :name="isAttitude === 1 ? 'good-job-o' : 'good-job'"
        />
      </template>
    </van-button>
  </div>
</template>

<script>
import { deleteLike, addLike } from '@/api/HomeArticle'
export default {
  name: 'LikeArticle',
  model: {
    prop: 'isAttitude',
    event: 'changeAttitude'
  },
  props: {
    isAttitude: {
      type: Number
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
    async changeLike() {
      this.loading = true
      try {
        if (this.isAttitude === 1) {
          await deleteLike(this.artId)
        } else {
          await addLike(this.artId)
        }

        // 通知父组件改变状态
        this.$emit('changeAttitude', -this.isAttitude)

        // 提醒
        this.$toast.success(this.isAttitude === -1 ? '取消点赞' : '点赞成功')

        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
